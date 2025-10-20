import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../model/userSchema.js'
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

export  const generateToken = async(userId)=>{
   const token = jwt.sign(
                { userId: userId },
                SECRET_KEY,
                { expiresIn: '1h' }
            );
            return token
}


export  const verifyToken = async(token)=>{
   const decode = jwt.verify(token,SECRET_KEY)
  const user = await User.findOne({_id : decode?.userId})
  return user

}