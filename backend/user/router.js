import {Router} from 'express'
import * as user from './user-model.js'

const router = Router()

router.post('/register',user.Register)

export default router