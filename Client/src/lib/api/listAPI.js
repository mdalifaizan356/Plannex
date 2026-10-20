import axiosInstance from "../instance/axios";

export const boardLists = async(boardId)=>{
    const res = await axiosInstance.get(`/newlist/showList/${boardId}`);
    return res;
}   

export const addNewList = async(boardId, data)=>{
    const res = await axiosInstance.post(`/newList/createList/${boardId}`, data);
    return res;
}   

export const deletelist = async(data)=>{
    const res = await axiosInstance.delete("/newList/deleteList", data);
    return res;
}   