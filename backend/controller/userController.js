import User from '../model/userSchema.js'
import { generateToken, verifyToken } from '../helper/helper.js';

export const createUser = async (req, res) => {
    try {
        const body = req.body
        const data = await new User(body).save()
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
        const userData = await verifyToken(token)



        if (userData) {
            res.json({ userData });
        } else {
            res.json(' Register yourself')

        }
    }
    catch (error) {
        console.log(error)
    }
}