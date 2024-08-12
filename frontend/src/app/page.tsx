"use client";
import {useState} from 'react';
import {QueryClient,QueryClientProvider} from 'react-query';
import Upperbar from "@/components/Upperbar";
import Sidebar from "@/components/Sidebar";
import Calendar from '@/components/Calendar';
import TaskList from '@/components/TaskList';
import { useUserContext } from '@/utils/UserProvider'
const queryClinet = new QueryClient();
export default function Home() {
  const [sideBarOpen,setSidebarOpen] =useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const user = useUserContext();
  const isLoggedIn = !!user;
  const handleMenuClick = ()=>{
    setSidebarOpen(!sideBarOpen);
  }
  return (
    <QueryClientProvider client={queryClinet}>
    <div className="bg-zinc-950 h-screen">
    <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
    <div className="flex flex-row items-start transition-all duration-500">
      {sideBarOpen && <Sidebar open={sideBarOpen} isLoggedIn={isLoggedIn} {...(isLoggedIn && { user })} />}
      <div className="flex flex-grow justify-around">
        <Calendar selectedDate={selectedDate} onSelectedDate={setSelectedDate} />
      </div>
      <div className="flex flex-col justify-between">
        {/* <TaskList selectedDate={selectedDate} /> */}
      </div>
    </div>
    </div>
    </QueryClientProvider>
  );
}
