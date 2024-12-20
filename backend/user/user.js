import mysqlP from 'mysql2/promise'
import dbConfig from '../app/config.js'

export class User{
    FelhasznaloId
    FelhasznaloNev
    Jelszo
    Email
    Statusz
    JogosultsagId
    Token

    static async loadDataFromDB(UserId){
        try {
            const conn = await mysqlP.createConnection(dbConfig)
            const[rows]= await conn.execute('Select * from Felhasznalok where FelhasznaloId = ?',[UserId])
            return rows[0]
        }
        catch {
            return undefined
        }
    }

    static async validUser (Email,Jelszo) {
        let conn;
        try {
            conn = await mysqlP.createConnection(dbConfig)
            const sql = 'select Login(?,?) as FelhasznaloId'
            const [rows] = await conn.execute(sql,[Email,Jelszo])
            return rows[0]?.FelhasznaloId || 0
        }
        catch (err) {
            console.error('Error during SQL execution:', err);
            return 0; 
        } 
        finally{
            if (conn) {
              await conn.end();
            }
        }
    }
}
