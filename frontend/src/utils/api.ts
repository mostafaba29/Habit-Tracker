import axios from 'axios';
import { Habit } from '@/components/Types/Habit';
import { Task } from '@/components/Types/Task'
const API_URL = "http://localhost:8000";

//user requests
export const fetchUser = async()=>{
    try{
        const response = await axios.get(`${API_URL}/api/v1/users`,
            {withCredentials: true}
        );
        return response.data;
    }catch(error){
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

export const userLogin = async({phone,password}:{phone:string,password:string}) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/users/login`,
            {phone, password},
            {withCredentials: true});
        return response.data.data;
    } catch (error) {
        throw new Error(`Error logging in: ${error.message}`);
    }
}

export const userSignUp = async({ name, phone, password}: { name: string; phone: string ; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/users/signup`,
            {name, phone, password},);
        return response.data.data;
    } catch (error) {
        throw new Error(`Error signing up: ${error.message}`);
    }
}  

export const userLogout = async() => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/users/logout`
            ,{withCredentials: true});
        return response.data.data;
    } catch (error) {
        throw new Error(`Error logging out: ${error.message}`);
    }
}


//habit requests
export const fetchHabits = async()=>{
    try{
        const response = await axios.get(`${API_URL}/api/v1/habits`,{
            withCredentials: true
        });
        return response.data.data;
    }catch(error){
        throw new Error(`Error fetching habits: ${error.message}`);
    }
}

export const createHabit = async(habit:Habit)=>{
    try{
        const respsone = await axios.post(`${API_URL}/api/v1/habits`,
            habit,
            {withCredentials:true}
        )
        return respsone.data.data
    }catch(error){
        throw new Error(`Error creating habit:${error.message}`)
    }
}

export const deleteHabit = async(habitId:string)=>{
    try{
        const respsone = await axios.delete(`${API_URL}/api/v1/habits/${habitId}`,{
            withCredentials:true
        })
        return respsone.data.data
    }catch(error){
        throw new Error(`Error deleting habit:${error.message}`)
    }
}

export const updateHabit = async({habitId,habit}:{habitId:string , habit:Habit})=>{
    try{
        const response = await axios.patch(`${API_URL}/api/v1/habits/${habitId}`,
            habit,
            {withCredentials:true}
        )
        return response.data.data
    }catch(error){
        throw new Error(`Error updating habit:${error.message}`)
    }
}

export const completeHabit = async(id:string)=>{
    try{
        const response = await axios.post(`${API_URL}/api/v1/habits/complete-habit`,
            {id},
            {withCredentials:true}
        )
        return response.data.data
    }catch(error){
        throw new Error(`Error completing habit:${error.message}`)
    }
}

//task requests 

export const fetchTasks = async()=>{
    try{
        const response = await axios.get(`${API_URL}/api/v1/tasks`,{
            withCredentials: true
        });
        return response.data.data;
    }catch(error){
        throw new Error(`error fetching tasks:${error.message}`)
    }
}

export const createTask = async(task:Task) => {
    try{
        const response = await axios.post(`${API_URL}/api/v1/tasks`,
            task,
            {withCredentials: true});
        return response.data.data;
    }catch(error){
        throw new Error(`Error creating task:${error.message}`)
    }
}

export const updateTask = async ({ taskId, task }: { taskId: string, task: Task }) => {
    try {
      const response = await axios.patch(`${API_URL}/api/v1/tasks/${taskId}`,
        task,
        { withCredentials: true });
      return response.data.data;
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }
export const completeTask = async(id: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/tasks/complete-task`,
            {id},
            {withCredentials: true});
        return response.data.data;
    } catch (error) {
        throw new Error(`error completing Task:${error.message}`)
    }
}

export const deleteTask = async (taskId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/api/v1/tasks/${taskId}`,
        { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  }



