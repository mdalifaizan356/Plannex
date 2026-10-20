import axiosInstance from "../instance/axios";

export const addNewTask = async(data)=>{
    const res = await axiosInstance.post("/newTask/createTask", data);
    return res;
}   

export const deletetask = async(data)=>{
    const res = await axiosInstance.delete("/newTask/deleteTask", data);
    return res;
}

export const taskStatusToggle = async(data)=>{
    const res = await axiosInstance.patch("/newTask/completeTask", data);
    return res;
}

export const movetask = async(data)=>{
    const res = await axiosInstance.post("/newTask/moveTask",  data);
    return res;
}