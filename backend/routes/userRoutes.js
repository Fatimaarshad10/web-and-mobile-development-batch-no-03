import express from 'express'
import {createUser , loginUser} from '../controller/userController.js'
const router = express.Router()


// router.get('/' , )
router.post('/register' , createUser)
router.post('/login' , loginUser)
// router.delete('/:id' , )
// router.patch('/:id' , )

export default router