import { verifyToken } from "../helper/jwt.js";

export const authMiddleware = async (req, res , next) => {
 try {
    const authHeader = req.headers['authorization'];
    console.log('header--->' , authHeader)
    const token = authHeader.split(" ")[1];
    console.log(token)
    const verify_token =  await verifyToken(token)
    console.log(verify_token)
    next();
  } catch (error) {
    return res.json({ message: "Invalid or expired token" });
  }
}