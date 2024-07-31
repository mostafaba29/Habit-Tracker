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
  const [selectedDate, setSelectedDate] = useState(new Date());
  


  useEffect(()=>{
    console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID)
    console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET)
  },[])


  const handleMenuClick = ()=>{
    setSidebarOpen(!sideBarOpen);
  }
  return (
    <QueryClientProvider client={queryClinet}>
    <div className="bg-zinc-950 h-screen">
    <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
    <div className="flex flex-row items-start transition-all duration-500">
      {sideBarOpen && <Sidebar open={sideBarOpen} />}
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
