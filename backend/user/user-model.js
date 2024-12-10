import mysqlP from 'mysql2/promise'
import mysql from 'mysql2'
import  {User} from './user.js'
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
        if(user.Jelszo.length < 5){
            res.status(404).send({error:"túl rövid a jelszó!"})
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
            case 1062 :
                        res.status(500).send({error:"Már létező felhasználó "});
                        break;
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
    const [rows] = await conn.execute('Select FelhasznaloNev,Email from Felhasznalok where FelhasznaloId = 8',[res.decodedToken.UserId])
    let user = rows[0]
    console.log(user)
    res.send(user)
}
