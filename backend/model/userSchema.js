import mongoose from "mongoose";
const userSchema = new mongoose.Schema ( 
    {
        username : String,
        first_name : String,
        last_name : String,
        email : String,
        password : String,
    }

)
const User = mongoose.model('User', userSchema);
export default User