import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../user/user.js'
dotenv.config()

export default async function logIn(req,res){
    try{
        let user = new User()
        Object.assign(user,req.body)
        if (!user.Email || !user.Jelszo) {
            res.status(400).send({error:'Hiányzó felhasználónév vagy jelszó'})
            return
        }

        const UserId = await User.validUser(user.Email,user.Jelszo)
        if(UserId==0) {
            res.status(401).send({error:"Hibás email és jelszó!"})
            return
        }

        const invalidCharaters = ['`',';',',','(',')',"'",'"','=','$'];

        for(let i = 0; i < invalidCharaters.length; i++)
        {
            if(user.Jelszo.includes(invalidCharaters[i]) || user.Email.includes(invalidCharaters[i]))
            {
                res.status(404).send({error:"Nem megengedett karakterek használata."})
                return
            }
        }
        user = await User.loadDataFromDB(UserId)
        if (user === undefined)
        {
            res.status(401).send({error:"A bejelentkezés nem sikerült"})
            return 
        }
        user.Jelszo == undefined
        const payload = {UserId:user.FelhasznaloId}
        const {JWT_STRING} = process.env
        user.Token = jwt.sign(payload,JWT_STRING,{ expiresIn:"2h"});
        res.status(200).send({succes:"Sikeres bejelentkezés",user:user})
    }
    catch(err){
        console.log(err)
    }
}