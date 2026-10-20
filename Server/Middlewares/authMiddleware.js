import { checkEmail } from "../services/authServices.js";
import { verifyToken } from "../utils/jwt.js"


export const auntheticate1 = async(req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(400).json({
                success:false,
                message: "Token Not Found",
                data:token
            })
        }
        const decoded = verifyToken(token);
        const user = await checkEmail(decoded.email);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(400).json({
            success:false,
            message: "Invalid Token",
        })
    }
}



export const auntheticate2 = async(req, res, next)=>{
    try {
        const {token} = req.cookies
        if(!token){
            return res.status(400).json({
                success:false,
                message: "Token Not Found",
                data:token
            })
        }
        const decoded = verifyToken(token);
        const user = await checkEmail(decoded.email);
        // console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(400).json({
            success:false,
            message: error.message,
        })
    }
}