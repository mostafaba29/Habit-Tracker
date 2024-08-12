import {Habit} from './Types/Habit';
import { Pen } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,  faTrashCan } from '@fortawesome/free-solid-svg-icons';
interface mediaCardProps {
    habit:Habit;
    onComplete: (habit: Habit) => void;
    onDelete: (habit: Habit) => void;
    onEdit: (habit: Habit) => void;
}
export default function HabitCard({habit, onComplete, onDelete, onEdit}:mediaCardProps){
    return (
        <div className="bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg h-[150px] w-[450px] p-4 flex flex-col justify-between m-1">
            <div className='flex flex-row justify-between items-center'>
                <h2 className="text-2xl font-semibold">{habit.title}</h2>
                <button onClick={()=> onEdit(habit)}><Pen size={28} className='text-gray-800 hover:text-gray-200 hover:bg-gray-700 rounded-lg p-1'  /></button>
            </div>
            <p className="text-md line-clamp-3 h-[75px]">{habit.description}</p>
            <div className="flex flex-row items-center justify-between">
                <p className="text-md text-white bg-gray-800 rounded-full px-3 w-[150px]">{habit.frequency}</p>
                <p className="text-md text-white bg-gray-800 rounded-full px-3 w-[150px]">{habit.duration || habit.occurrencesPerDay}</p>
                <button className="text-red-500 hover:text-red-700" onClick={() => onDelete(habit)}><FontAwesomeIcon icon={faTrashCan} size='lg' /></button>
                <button className="text-green-500 hover:text-green-700" onClick={() => onComplete(habit)}><FontAwesomeIcon icon={faCheck} size='lg' /></button>
            </div>
        </div>
    )
}