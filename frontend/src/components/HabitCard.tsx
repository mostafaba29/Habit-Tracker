import {Habit} from './Habit';
import {Button} from './ui/button';
interface mediaCardProps {
    habit:Habit;
}
export default function HabitCard({habit}:mediaCardProps){
    return (
        <div className="bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg h-[250px] w-[300px] p-4 flex flex-col justify-between m-1">
            <h2 className="text-2xl font-semibold">{habit.name}</h2>
            <p className="text-md line-clamp-3 h-[75px]">{habit.description}</p>
            <p className="text-md text-white bg-gray-800 rounded-full px-3 w-[150px] mx-[110px]">{habit.freqency.type}</p>
            <Button className='rounded-xl bg-gray-800 hover:bg-gray-600 my-2 mx-1'>Edit habit</Button>
        </div>
    )
}