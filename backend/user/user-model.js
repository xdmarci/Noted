import mysqlP from 'mysql2/promise'
import dbConfig from '../app/config.js'


export async function Register(req,res) {
    const user = req.body
    if (!user.Email || !user.FelhasznaloNev || !user.Jelszo)
    {
        res.status(400).send({error: "Hiányzó adatok"})
        return
    }
    try {
    
        const conn = await mysqlP.createConnection(dbConfig)
        const invalidCharaters = ['`',';',',','(',')',"'",'"','=','$'];
        for(let i = 0; i < invalidCharaters.length; i++)
        {
            if(user.FelhasznaloNev.includes(invalidCharaters[i]) || user.Jelszo.includes(invalidCharaters[i]) || user.Email.includes(invalidCharaters[i]))
            {
                res.status(404).send({error:"Nem megengedett karakterek használata."})
                return
            }
        }
        if(user.Jelszo.length < 8){
            res.status(404).send({error:"túl rövid a jelszó minimum hossz: 8!"})
            return
        }
        if(user.FelhasznaloNev.length < 5){
            res.status(404).send({error:"túl rövid a felhasználó név minimum hossz: 5!"})
            return
        }
        if(!(/\d/.test(user.Jelszo))){
            res.status(404).send({error:"A jelszónak tartalmaznia kell számokat!"})
            return
        }
        if(!(/[A-Z]/.test(user.Jelszo))){
            res.status(404).send({error:"A jelszónak tartalmaznia kell nagy betűt!"})
            return
        }
        if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(user.Email)){
            res.status(404).send({error:"Nem megfelelő a email formátuma."})
            return
        }
        const [rows] = await conn.execute('insert into Felhasznalok values(null,?,?,?,?,?)',[user.FelhasznaloNev,user.Jelszo,user.Email,user.Statusz,user.JogosultsagId])
        if (rows.affectedRows > 0) {
            res.status(201).send({success:"Sikeres regisztráció",data:user})
            return  
        }
        res.status(404).send({error:"Hiba a regisztrációkor!"})
    }
    catch (err){
        switch (err.errno) {
            case 1062 : res.status(500).send({error:"Már létező felhasználó "});break;
            case 1045 : res.status(500).send({error:"Hiba a csatlakozáskor nem megfelelő adatbázis jelszó"}); break;
            default:  res.status(500).send({error:"Hiba a regisztrációkor"}); break;
        }
        return
    }
}

export async function getUserFromToken(req, res) {
    const conn = await mysqlP.createConnection(dbConfig)
    if (!res.decodedToken.UserId) {
        res.status(401).send({error:"Hiányzó paraméter"})
        return
    }
    const [rows] = await conn.execute('Select FelhasznaloNev,Email from Felhasznalok where FelhasznaloId = ?',[res.decodedToken.UserId])
    let user = rows[0]
    if(user.statusz == 0){
        res.status(401).send({error:"Fiókja blokkolva van"})
        return 
    }
    res.status(200).send(user)
}

export async function updateUserWithToken(req, res) {
    const conn = await mysqlP.createConnection(dbConfig)
    if (!res.decodedToken.UserId) {
        res.status(401).send({error:"Hiányzó paraméter"})
        return
    }

    const [rows] = await conn.execute('Select * from Felhasznalok where FelhasznaloId = ?',[res.decodedToken.UserId])
    let olduser = rows[0]
    let user = olduser
    if(user.statusz == 0){
        res.status(401).send({error:"Fiókja blokkolva van"})
        return 
    }
    if(!olduser) {
        res.status(500).send({error:'A felhasználó nem létezik'})
        return
    } 
    Object.assign(user,req.body)
    try {
        const conn = await mysqlP.createConnection(dbConfig)
        const [rows] = await conn.execute('Update Felhasznalok set FelhasznaloNev =?,Email=?, Jelszo=? where FelhasznaloId =?',[user.FelhasznaloNev,user.Email,user.Jelszo,res.decodedToken.UserId])
        user.Jelszo=undefined
        if (rows.affectedRows > 0) {
            res.status(201).send({success:"Sikeres frissítés",data:user})
            return  
        }
        res.status(404).send({error:"Sikertelen az adatok frissítése!"})
    }
    catch (err){
        switch (err.errno) {
            case 1062 : res.status(500).send({error:"Már létező felhasználó "});break;
            case 1045 : res.status(500).send({error:"Hiba a csatlakozáskor nem megfelelő adatbázis jelszó"}); break;
            default:  res.status(500).send({error:"Hiba a frissítéskor: " + err}); break;
        }
        return
    }
}

export async function updateUserByIdAdmin(req, res) {
    if (!req.params.UserId)
    {
        res.status(401).send({error: "Hiányzó felhasználó azonosító"})
        return
    }
    const conn = await mysqlP.createConnection(dbConfig)
    if (!res.decodedToken.UserId) {
        res.status(401).send({error:"Hiányzó paraméter"})
        return
    }

    const [rows2] = await conn.execute('Select * from Felhasznalok where FelhasznaloId = ?',[res.decodedToken.UserId])
    let adminuser = rows2[0]
    if(adminuser.statusz == 0){
        res.status(401).send({error:"Fiókja blokkolva van"})
        return 
    }
    if(adminuser.JogosultsagId != 3 && adminuser.JogosultsagId != 2){
        res.status(404).send({error:"Nincs joga más adatainak a frissítéséhez!"})
        return
    }    

    const [rows] = await conn.execute('Select * from Felhasznalok where FelhasznaloId = ?',[req.params.UserId])
    let olduser = rows[0]
    let user = olduser
    if(!olduser) {
        res.status(500).send({error:'A felhasználó nem létezik'})
        return
    } 

    Object.assign(user,req.body)
    try {
        const conn = await mysqlP.createConnection(dbConfig)
        const [rows] = await conn.execute('Update Felhasznalok set FelhasznaloNev =?,Email=?, Jelszo=?, Statusz=? where FelhasznaloId =?',[user.FelhasznaloNev,user.Email,user.Jelszo,user.statusz,req.params.UserId])
        user.Jelszo=undefined
        if (rows.affectedRows > 0) {
            res.status(201).send({success:"Sikeres frissítés",data:user})
            return  
        }
        res.status(404).send({error:"Sikertelen az adatok frissítése!"})
    }
    catch (err){
        switch (err.errno) {
            case 1062 : res.status(500).send({error:"Már létező felhasználó "});break;
            case 1045 : res.status(500).send({error:"Hiba a csatlakozáskor nem megfelelő adatbázis jelszó"}); break;
            default:  res.status(500).send({error:"Hiba a frissítéskor: " + err}); break;
        }
        return
    }
}


export async function deleteUserByIdAdmin(req, res) {
    if (!req.params.UserId)
    {
        res.status(401).send({error: "Hiányzó felhasználó azonosító"})
        return
    }
    const conn = await mysqlP.createConnection(dbConfig)
    if (!res.decodedToken.UserId) {
        res.status(401).send({error:"Hiányzó paraméter"})
        return
    }

    const [rows2] = await conn.execute('Select * from Felhasznalok where FelhasznaloId = ?',[res.decodedToken.UserId])
    let adminuser = rows2[0]
    if(adminuser.statusz == 0){
        res.status(401).send({error:"Fiókja blokkolva van"})
        return 
    }
    if(adminuser.JogosultsagId != 3){
        res.status(404).send({error:"Nincs joga az adott művelet elvégzéshez!"})
        return
    }    

    const [rows] = await conn.execute('Select * from Felhasznalok where FelhasznaloId = ?',[req.params.UserId])
    let olduser = rows[0]
    let user = olduser
    if(!olduser) {
        res.status(500).send({error:'A felhasználó nem létezik'})
        return
    } 

    try {
        const conn = await mysqlP.createConnection(dbConfig)
        const [rows] = await conn.execute('DELETE from Felhasznalok where FelhasznaloId =?',[req.params.UserId])
        user.Jelszo=undefined
        if (rows.affectedRows > 0) {
            res.status(201).send({success:"Sikeres törlés",data:user})
            return  
        }
        res.status(404).send({error:"Sikertelen a felhasználó törlése!"})
    }
    catch (err){
        switch (err.errno) {
            case 1062 : res.status(500).send({error:"Már létező felhasználó "});break;
            case 1045 : res.status(500).send({error:"Hiba a csatlakozáskor nem megfelelő adatbázis jelszó"}); break;
            default:  res.status(500).send({error:"Hiba a törléskor: " + err}); break;
        }
        return
    }
}
export async function getUserByIdAdmin(req, res) {
    if (!req.params.UserId)
        {
            res.status(401).send({error: "Hiányzó felhasználó azonosító"})
            return
        }
        const conn = await mysqlP.createConnection(dbConfig)
        if (!res.decodedToken.UserId) {
            res.status(401).send({error:"Hiányzó paraméter"})
            return
        }
    
        const [rows2] = await conn.execute('Select * from Felhasznalok where FelhasznaloId = ?',[res.decodedToken.UserId])
        let adminuser = rows2[0]
        if(adminuser.statusz == 0){
            res.status(401).send({error:"Fiókja blokkolva van"})
            return 
        }
        if(adminuser.JogosultsagId != 3 && adminuser.JogosultsagId != 2){
            res.status(404).send({error:"Nincs joga az adott művelet elvégzéshez!"})
            return
        }    
    
        const [rows] = await conn.execute('Select FelhasznaloNev,Email from Felhasznalok where FelhasznaloId = ?',[req.params.UserId])
        let user = rows[0]
        if(!user) {
            res.status(500).send({error:'A felhasználó nem létezik'})
            return
        } 
        res.status(200).send(user)
    
        try {
        }
        catch (err){
            switch (err.errno) {
                case 1062 : res.status(500).send({error:"Már létező felhasználó "});break;
                case 1045 : res.status(500).send({error:"Hiba a csatlakozáskor nem megfelelő adatbázis jelszó"}); break;
                default:  res.status(500).send({error:"Hiba a törléskor: " + err}); break;
            }
            return
        }
}

export async function getUsersAdmin(req, res) {
        const conn = await mysqlP.createConnection(dbConfig)
        if (!res.decodedToken.UserId) {
            res.status(401).send({error:"Hiányzó paraméter"})
            return
        }
    
        const [rows2] = await conn.execute('Select * from Felhasznalok where FelhasznaloId = ?',[res.decodedToken.UserId])
        let adminuser = rows2[0]
        if(adminuser.statusz == 0){
            res.status(401).send({error:"Fiókja blokkolva van"})
            return 
        }
        if(adminuser.JogosultsagId != 3 && adminuser.JogosultsagId != 2){
            res.status(404).send({error:"Nincs joga az adott művelet elvégzéshez!"})
            return
        }    
    
        const [rows] = await conn.execute('Select FelhasznaloId,FelhasznaloNev,Email from Felhasznalok')
        let users = rows
        if(!users) {
            res.status(500).send({error:'Sikertelen lekérdezés'})
            return
        } 
        res.status(200).send(users)
    
        try {
        }
        catch (err){
            switch (err.errno) {
                case 1062 : res.status(500).send({error:"Már létező felhasználó "});break;
                case 1045 : res.status(500).send({error:"Hiba a csatlakozáskor nem megfelelő adatbázis jelszó"}); break;
                default:  res.status(500).send({error:"Hiba a törléskor: " + err}); break;
            }
            return
        }
}