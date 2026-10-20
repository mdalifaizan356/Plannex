import crypto from "crypto";

export const generateOTP = async ()=>{
    const otp = await crypto.randomInt(100000, 999999);
    return otp;
} 