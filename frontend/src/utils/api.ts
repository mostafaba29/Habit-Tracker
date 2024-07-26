import axios from 'axios';

const API_URL = "http://localhost:8000";

export const fetchTasks = async(data:Date)=>{
    const response = await axios.get(`${API_URL}/tasks`,{
        params:{data:data.toISOString()},
    });
    return response.data;
}

export const completeTask = async(taskId: string) => {
    try {
        const response = await axios.post(`${API_URL}/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error completing task:', error);
    }
}

export const deleteTask = async(taskId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}