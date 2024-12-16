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
            res.status(201).send({succes:"Sikeres regisztráció",data:user})
            return  
        }
        res.status(404).send({error:"Nem lett rögzítve az adat!"})
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
    res.send(user)
}
