import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface HabitStreakCalendarProps {
    completedDates: string[];
}
export default function HabitStreakCalendar({ completedDates }: HabitStreakCalendarProps){
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      return completedDates.includes(date.toISOString().split('T')[0])
        ? 'bg-green-500 text-white rounded-full'
        : '';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Habit Streak Calendar</h2>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

