import axiosInstance from "../instance/axios";

export const EmailVerification = async(data)=>{
    const res = await axiosInstance.post("/newuser/sendotp", data);
    return res;
}   

export const userRegiteration = async(data)=>{
    const res = await axiosInstance.patch("/newuser/createUser/", data);
    return res;
}   

export const signIn = async(data)=>{
    const res = await axiosInstance.post("/newuser/loginUser", data);
    return res;
}   

export const getCurrentUser = async(data)=>{
    const res = await axiosInstance.get("/newuser/fetchUser", data);
    return res;
}   

export const updatePassword = async(data)=>{
    const res = await axiosInstance.patch("newuser/recoverPassword", data);
    return res;
}


export const changePassword = async(data)=>{
    const res = await axiosInstance.patch("newuser/changePassword", data);
    return res;
}

