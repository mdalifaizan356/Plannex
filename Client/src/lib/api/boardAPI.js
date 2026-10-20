import axiosInstance from "../instance/axios";

export const userBoards = async(userId)=>{
    const res = await axiosInstance.get(`/newboard/showBoard/${userId}`);
    return res;
}   

export const createNewBoard = async(userId, data)=>{
    const res = await axiosInstance.post(`/newboard/createBoard/${userId}`, data);
    return res;
}   

export const deleteboard = async(data)=>{
    const res = await axiosInstance.delete("/newboard/deleteboard", data);
    return res;
}