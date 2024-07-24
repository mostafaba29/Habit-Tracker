"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import {QueryClient,QueryClientProvider} from 'react-query';
import clsx from 'clsx';
import {Habit} from '@/components/Habit';
import Upperbar from "@/components/Upperbar";
import Sidebar from "@/components/Sidebar";
import Calendar from '@/components/Calendar';
import TaskList from '@/components/TaskList';
const queryClinet = new QueryClient();
export default function Home() {
  const [sideBarOpen,setSidebarOpen] =useState(false);
  const [userLoggedIn,setUserLoggedIn]=useState(false);
  const [habits,setHabits] = useState<Habit[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const fetchHabits = async ()=>{
      try{
        const response = await axios.get('http://localhost:3000/api/v1/habit');
        setHabits(response.data);
      }catch(error){
        console.log(error);
      }
      }

  const userCheck = async ()=>{
      try {
          const response = await axios.get('http://localhost:3000/api/user');
          setUserLoggedIn(response.data.loggedIn);
      } catch (error) {
          console.log(error);
      }
  }


  useEffect(()=>{
    fetchHabits();
    userCheck();
  },[])


  const handleMenuClick = ()=>{
    setSidebarOpen(!sideBarOpen);
  }
  return (
    <QueryClientProvider client={queryClinet}>
    <div className="bg-zinc-950 h-screen">
    <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
    <div className="flex flex-row items-start transition-all duration-500">
      {sideBarOpen && <Sidebar open={sideBarOpen} userLoggedIn={userLoggedIn} userName={'mostafa badr'} userImage={'image.png'} />}
      <div className="flex flex-grow justify-around">
        <Calendar selectedDate={selectedDate} onSelectedDate={setSelectedDate} />
      </div>
      <div className="flex flex-col justify-between">
        <TaskList selectedDate={selectedDate} />
      </div>
    </div>
    </div>
    </QueryClientProvider>
  );
}
