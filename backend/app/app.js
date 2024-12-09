import express from "express" 
import cors from "cors" 
import bodyParser from "body-parser" 
import userRouter from "../user/router.js"
import loginRouter from "../login/router.js"
const app = express()

app.use(cors({origin:'*'}))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true})); 

app.use('/',userRouter)
app.use('/',loginRouter)

export default app;  