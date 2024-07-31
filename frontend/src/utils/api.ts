import axios from 'axios';

const API_URL = "http://localhost:8000";

export const fetchUser = async()=>{
    try{
        const response = await axios.get(`${API_URL}/api/v1/users`);
        return response.data.data;
    }catch(error){
        console.log('Error fetching user:', error);
    }
}

export const fetchTasks = async()=>{
    try{
        const response = await axios.get(`${API_URL}/api/v1/tasks`,{
            withCredentials: true
        });
        return response.data.data;
    }catch(error){
        console.log('Error fetching tasks:', error);
    }
}

export const createTask = async(title: string, description: string, priority: string) => {
    try{
        const response = await axios.post(`${API_URL}/api/v1/tasks`,
            {title, description, priority},
            {withCredentials: true});
        return response.data.data;
    }catch(error){
        console.log('Error creating task:', error);
    }
}

export const updateTask = async(id?: string, title?: string, description?: string, priority?: string) => {
    try{
        const response = await axios.patch(`${API_URL}/api/v1/tasks/${id}`,
            {title, description, priority},
            {withCredentials: true});
        return response.data.data;
    }catch(error){
        console.log('Error updating task:', error);
    }
}
export const completeTask = async(id: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/tasks/complete-task`,
            {_id: id,},
            {withCredentials: true});
        return response.data.data;
    } catch (error) {
        console.error('Error completing task:', error);
    }
}

export const deleteTask = async(id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/api/tasks/v1/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}