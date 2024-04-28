import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import QuoteSection from "../components/QuoteSection";
import AddHabitForm from "../components/AddHabitForm";
import '../assets/styles/HabitsStyle.css';
import axios from "axios";

interface Habit {
    id: number,
    habitName: string,
    discription: string,
    deadline: string,
    status: string
}
const Habits:React.FC = () => {
    const [habits,setHabits] = useState<Habit[]>([]);
    const [showForm,setShowForm] = useState<boolean>(false);
    const getHabits = async ()=>{
        try{
            const response = await axios.get<Habit[]>('http://localhost:5000/habits',{withCredentials: true});
            setHabits(response.data);
            console.log(response.data);
        }catch(error){
            console.error('error during fetching habits',error);
        }
    }
    useEffect(() => {
        getHabits();
    },[]);

    const handleAddHabitClick = ()=>{
        setShowForm(true);
    }

    const handleHabitSubmission =()=>{
        setShowForm(false);
        getHabits();

    }
    return (
        <>
        <QuoteSection />
        <SideBar />
        <div className="habits">
            <table>
                <thead>
                    <tr>
                        <th>Habit Name</th>
                        <th>Discription</th>
                        <th>Deadline</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit=>(
                        <tr key={habit.id}>
                            <td>{habit.habitName}</td>
                            <td>{habit.discription}</td>
                            <td>{habit.deadline}</td>
                            <td>{habit.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <button id='add-habit' onClick={handleAddHabitClick}>Add Habit</button>
        {showForm && <AddHabitForm onSubmit={handleHabitSubmission}/>}
        </>
    );
};  

export default Habits