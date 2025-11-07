import express from 'express'
import {createUser , getUsers, loginUser} from '../controller/userController.js'
import { authMiddleware } from '../middleware/auth.js'
const router = express.Router()


router.get('/' , authMiddleware , getUsers)
router.post('/register' , createUser)
router.post('/login' , loginUser)

export default router
