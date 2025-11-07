import User from '../model/userSchema.js'
import bcrypt from 'bcrypt'
import { generateToken, verifyToken } from '../helper/jwt.js'



export const createUser = async (req, res) => {
    try {
        let {username , email , password} = req.body
        const hashpassword = await bcrypt.hash(password , 10)
        password = hashpassword
        const data = await new User({username , email , password}).save()
        res.json(' User is created')
    }
    catch (error) {
        console.log(error)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email } = req.body
        const existingUser = await User.findOne({ email });

        // Generate token
        const token = await generateToken(existingUser._id)

        if (token) {
            res.json({ token });
        } else {
            res.json(' Register yourself')

        }
    }
    catch (error) {
        console.log(error)
    }
}


export const getUsers = async (req, res) => {
    try {
        const data = await User.find()
        res.json({ data })
    } catch (error) {
        res.json(error)
    }
}