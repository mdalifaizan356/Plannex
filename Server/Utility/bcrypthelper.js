import bcrypt from "bcrypt";

export const hashingpassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    return hashpassword;
}


export const comparePassword = async(plainPassword, hashPassword)=>{
    const isMatch = await bcrypt.compare(plainPassword, hashPassword)
    return isMatch;
}