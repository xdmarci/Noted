import mysqlP from 'mysql2/promise'
import dbConfig from '../app/config.js'

export async function Register(req,res) {
    const user = req.body
    if (!user.Email  || !user.FelhasznaloNev || !user.Jelszo)
    {
        res.status(400).send({error: "Hiányzó adatok"})
        return
    }
    try {

        const conn = await mysqlP.createConnection(dbConfig)
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
