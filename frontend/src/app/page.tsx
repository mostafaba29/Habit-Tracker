"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import clsx from 'clsx';
import {Habit} from '@/components/Habit';
import {stat} from '@/components/Stat';
import Upperbar from "@/components/Upperbar";
import Sidebar from "@/components/Sidebar";
import AllHabits from "@/components/AllHabits";
import Stats from "@/components/Stats";
const dummyHabits: Habit[] = [
  {
      name: "Morning Yoga",
      description: "30 minutes of yoga to start the day",
      done: false,
      duration: 30,
      startTime: new Date('2024-01-01T07:00:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user1"
  },
  {
      name: "Read a Book",
      description: "Read for 20 minutes before bed",
      done: false,
      duration: 20,
      startTime: new Date('2024-01-01T21:00:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user2"
  },
  {
      name: "Morning Run",
      description: "5km run every morning",
      done: false,
      duration: 45,
      startTime: new Date('2024-01-01T06:00:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user3"
  },
  {
      name: "Drink Water",
      description: "Drink 8 glasses of water daily",
      done: false,
      duration: 5,
      startTime: new Date('2024-01-01T08:00:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user4"
  },
  {
      name: "Meditation",
      description: "10 minutes of meditation in the evening",
      done: false,
      duration: 10,
      startTime: new Date('2024-01-01T20:00:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user5"
  },
  {
      name: "Jogging",
      description: "30 minutes jogging every other day",
      done: false,
      duration: 30,
      startTime: new Date('2024-01-01T06:30:00'),
      freqency: { type: "Weekly", value: 3 },
      user: "user6"
  },
  {
      name: "Cooking Class",
      description: "Attend a cooking class",
      done: false,
      duration: 120,
      startTime: new Date('2024-01-03T18:00:00'),
      freqency: { type: "Monthly", value: 1 },
      user: "user7"
  },
  {
      name: "Gardening",
      description: "Work in the garden for 45 minutes",
      done: false,
      duration: 45,
      startTime: new Date('2024-01-02T09:00:00'),
      freqency: { type: "Weekly", value: 1 },
      user: "user8"
  },
  {
      name: "Study",
      description: "Study for upcoming exams",
      done: false,
      duration: 120,
      startTime: new Date('2024-01-01T19:00:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user9"
  },
  {
      name: "Gym Workout",
      description: "1 hour workout session",
      done: false,
      duration: 60,
      startTime: new Date('2024-01-01T17:00:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user10"
  },
  {
      name: "Learn Guitar",
      description: "Practice guitar for 30 minutes",
      done: false,
      duration: 30,
      startTime: new Date('2024-01-01T18:30:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user11"
  },
  {
      name: "Write Journal",
      description: "Write in journal for 15 minutes",
      done: false,
      duration: 15,
      startTime: new Date('2024-01-01T22:00:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user12"
  },
  {
      name: "Clean Room",
      description: "Clean the room every weekend",
      done: false,
      duration: 60,
      startTime: new Date('2024-01-06T10:00:00'),
      freqency: { type: "Weekly", value: 1 },
      user: "user13"
  },
  {
      name: "Call Family",
      description: "Call family members",
      done: false,
      duration: 30,
      startTime: new Date('2024-01-01T20:30:00'),
      freqency: { type: "Weekly", value: 1 },
      user: "user14"
  },
  {
      name: "Volunteer Work",
      description: "Volunteer at local shelter",
      done: false,
      duration: 180,
      startTime: new Date('2024-01-05T14:00:00'),
      freqency: { type: "Monthly", value: 1 },
      user: "user15"
  },
  {
      name: "Paint",
      description: "Spend time painting",
      done: false,
      duration: 60,
      startTime: new Date('2024-01-01T15:00:00'),
      freqency: { type: "Weekly", value: 2 },
      user: "user16"
  },
  {
      name: "Bike Ride",
      description: "Bike ride in the park",
      done: false,
      duration: 45,
      startTime: new Date('2024-01-01T16:00:00'),
      freqency: { type: "Weekly", value: 3 },
      user: "user17"
  },
  {
      name: "Watch Documentary",
      description: "Watch an educational documentary",
      done: false,
      duration: 90,
      startTime: new Date('2024-01-03T20:00:00'),
      freqency: { type: "Monthly", value: 1 },
      user: "user18"
  },
  {
      name: "Photography",
      description: "Take photos around the city",
      done: false,
      duration: 120,
      startTime: new Date('2024-01-02T15:00:00'),
      freqency: { type: "Weekly", value: 1 },
      user: "user19"
  },
  {
      name: "Learn Coding",
      description: "Complete a coding lesson",
      done: false,
      duration: 60,
      startTime: new Date('2024-01-01T19:30:00'),
      freqency: { type: "Daily", value: 1 },
      user: "user20"
  }
];

const stats: stat[] = [
  { id: 1, label: "Total Habits", value: 20 },
  { id: 2, label: "Completed Habits", value: 15 },
  { id: 3, label: "Pending Habits", value: 5 },
  { id: 4, label: "Most Frequent Habit", value: "Morning Run" },
  { id: 5, label: "Longest Habit Streak", value: "15 days" },
  { id: 6, label: "Average Habit Duration", value: "30 minutes" },
  { id: 7, label: "Total Time Spent on Habits", value: "10 hours" },
  { id: 8, label: "Daily Habit Completion Rate", value: "75%" },
  { id: 9, label: "Weekly Habit Completion Rate", value: "80%" },
  { id: 10, label: "Monthly Habit Completion Rate", value: "90%" },
  { id: 11, label: "Favorite Habit", value: "Reading" },
  { id: 12, label: "Least Favorite Habit", value: "Cleaning" },
  { id: 13, label: "Most Challenging Habit", value: "Jogging" },
  { id: 14, label: "Easiest Habit", value: "Drinking Water" },
  { id: 15, label: "Most Improved Habit", value: "Meditation" }
];
export default function Home() {
  const [sideBarOpen,setSidebarOpen] =useState(false);
  const [userLoggedIn,setUserLoggedIn]=useState(false);
  const [habits,setHabits] = useState<Habit[]>([]);
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
    <div className="bg-zinc-950 h-screen">
    <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
    <div className="flex flex-row items-start transition-all duration-500">
      {sideBarOpen && <Sidebar open={sideBarOpen} userLoggedIn={userLoggedIn} userName={'mostafa badr'} userImage={'image.png'} />}
      <div className="flex flex-grow justify-around">
        <AllHabits habits={dummyHabits} />
        <Stats stats={stats} />
      </div>
    </div>
    </div>
  );
}
