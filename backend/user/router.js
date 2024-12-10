import {Router} from 'express'
import * as user from './user-model.js'
import auth from '../app/auth.js'

const router = Router()

router.post('/register',user.Register)
router.get('/getUser',auth,user.getUserFromToken)

export default router
