import {format , addDays, startOfWeek, subMonths, addMonths} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
    selectedDate:Date;
    onSelectedDate:(date:Date)=>void;
}

export default function Calendar({selectedDate,onSelectedDate}:CalendarProps) {
    const startDate = startOfWeek(selectedDate);

    const handlePrevMonth = () => {
        onSelectedDate(subMonths(selectedDate, 1));
    };

    const handleNextMonth = () => {
        onSelectedDate(addMonths(selectedDate, 1));
    };

    return (
        <div className=" bg-zinc-800 p-4 mt-4 rounded-lg">
            <div className="flex justify-between items-center-mb-4">
                <button onClick={handlePrevMonth} className="text-white hover:bg-zinc-700 p-2 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-white text-xl font-bold">
                    {format(selectedDate, 'MMMM yyyy')}
                </h2>
                <button onClick={handleNextMonth} className="text-white hover:bg-zinc-700 p-2 rounded-full">
                    <ChevronRight size={24} />
                </button>
            </div>
            <div className="flex flex-wrap justify-between items-center">
            {[...Array(30)].map((_,index) => {
                const date = addDays(startDate,index);
                const isSelected = format(date,'yyyy-MM-dd') === format(selectedDate,'yyyy-MM-dd');
                return (
                    <button key={index} onClick={() => onSelectedDate(date)} className={`flex flex-col items-center p-2 rounded-3xl w-[40px] m-[.125rem] ${
                        isSelected ? 'bg-lime-600 text-white' : 'hover:bg-zinc-600'
                      }`}>
                        <span className="text-sm font-medium text-white">{format(date,'EEE')}</span>
                        <span className="text-xs font-medium text-white">{format(date,'d')}</span>
                    </button>
                );
            })}
            </div>
        </div>
    )
}