import jwt from "jsonwebtoken";

export const genToken =(id, email, role)=>{
    const token = jwt.sign(
        {
            id,
            email,
            role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    return token;
}


export const verifyToken = (token)=>{
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
}

