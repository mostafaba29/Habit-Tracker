'use client';
import {useState} from 'react';
import OverallProgressChart from '@/components/statsComponents/OverallProgressChart';
import HabitStreakCalendar from '@/components/statsComponents/HabitStreakCalendar';
import CompletionRateCard from '@/components/statsComponents/CompletionRateCard';
import TopPerformingHabitsCard from '@/components/statsComponents/TopPerformingHabitsCard';
import DailyActivityHeatmap from '@/components/statsComponents/DailyActivityHeatmap';
import WeeklyComparisonChart from '@/components/statsComponents/WeeklyComparisonChart';
import MoodCorrelationGraph from '@/components/statsComponents/MoodCorrelationGraph';
import HabitCategoryBreakdown from '@/components/statsComponents/HabitCategoryBreakdown';
import LongestStreakCard from '@/components/statsComponents/LongestStreakCard';
import TimeInvestedChart from '@/components/statsComponents/TimeInvestedChart';
import Upperbar from '@/components/Upperbar';
import Sidebar from '@/components/Sidebar';
import { useUserContext } from '@/utils/UserProvider';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    BarElement,
    ArcElement,
    Title, 
    Tooltip, 
    Legend 
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
// Dummy data
const overallProgressData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [65, 59, 80, 81, 56, 55],
};

const completedDates = [
  '2023-06-01', '2023-06-03', '2023-06-05', '2023-06-07', '2023-06-09',
  '2023-06-11', '2023-06-13', '2023-06-15', '2023-06-17', '2023-06-19',
];

const completionRate = 75;

const topPerformingHabits = [
  { name: 'Exercise', completionRate: 90 },
  { name: 'Reading', completionRate: 85 },
  { name: 'Meditation', completionRate: 80 },
];

const dailyActivityData = [
  { date: '2023-06-01', count: 4 },
  { date: '2023-06-02', count: 2 },
  { date: '2023-06-03', count: 5 },
  // @. more dates
];

const weeklyComparisonData = {
  thisWeek: [4, 5, 3, 6, 2, 4, 3],
  lastWeek: [3, 4, 4, 5, 3, 3, 2],
};

const moodCorrelationData = [
  { x: 60, y: 6 },
  { x: 70, y: 7 },
  { x: 80, y: 8 },
  { x: 90, y: 9 },
  { x: 100, y: 10 },
];

const habitCategoryData = [
  { category: 'Health', count: 3 },
  { category: 'Productivity', count: 2 },
  { category: 'Learning', count: 2 },
  { category: 'Social', count: 1 },
];

const longestStreak = { habit: 'Meditation', streak: 21 };

const timeInvestedData = [
  { habit: 'Exercise', timeInvested: 300 },
  { habit: 'Reading', timeInvested: 200 },
  { habit: 'Meditation', timeInvested: 150 },
  { habit: 'Coding', timeInvested: 400 },
];

const StatsPage = () => {
    const [sideBarOpen,setSidebarOpen] =useState(false);
    const user = useUserContext();
    const isLoggedIn = !!user;
    const handleMenuClick = ()=>{
        setSidebarOpen(!sideBarOpen);
      }
  return (
    <div>
        <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
        {sideBarOpen && <Sidebar open={sideBarOpen} isLoggedIn={isLoggedIn} {...(isLoggedIn && { user })} />}
    <div className="bg-zinc-900 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Habit Tracking Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <OverallProgressChart data={overallProgressData} />
        <HabitStreakCalendar completedDates={completedDates} />
        <CompletionRateCard rate={completionRate} />
        <TopPerformingHabitsCard habits={topPerformingHabits} />
        <DailyActivityHeatmap data={dailyActivityData} />
        <WeeklyComparisonChart data={weeklyComparisonData} />
        <MoodCorrelationGraph data={moodCorrelationData} />
        <HabitCategoryBreakdown data={habitCategoryData} />
        <LongestStreakCard habit={longestStreak.habit} streak={longestStreak.streak} />
        <TimeInvestedChart data={timeInvestedData} />
      </div>
    </div>
    </div>
  );
};

export default StatsPage;