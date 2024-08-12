import {Habit} from './Types/Habit';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Check, X } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

interface AllHabitsProps {
    habits:Habit[];
}

const updateHabitState = async (id:number,state:string) => {
    try {
        const response = await axios.patch(`http://localhost:3000/api/habit/${id}`, {state},{withCredentials: true});
        console.log('habit updated:', response.data);
    } catch (error) {
        console.error('Error updating habit:', error);
    }
}

const stateBadge = (state:string) => {
    switch(state){
        case 'done':
            return <Badge className="bg-green-500 text-white">Done</Badge>
        case 'missed':
            return <Badge className="bg-red-500 text-white">Missed</Badge>
        default:
            return <Badge className="bg-yellow-500 text-white">Pending</Badge>
    }
};

export default function Allhabits ({habits}:AllHabitsProps){
    return (
        <ScrollArea className="h-[700px] w-[700px] rounded-lg border-4 border-lime-600 bg-gray-50 m-8">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none text-zinc-900 ">Habits</h4>
                {habits.map((habit,id)=>(
                    
                    <div key={id}  >
                        <div className='flex flex-row justify-between items-center mb-2'>
                        <div className="text-sm text-zinc-900 w-1/3">
                            {habit.name}
                        </div>
                        <div className="w-1/3 text-center">
                            {stateBadge(habit.state)}
                        </div>
                        <div className="w-1/3 flex justify-end space-x-2">
                            <button onClick={() => updateHabitState(habit.id, 'done')}>
                                <Check className="text-green-500" />
                            </button>
                            <button onClick={() => updateHabitState(habit.id, 'missed')}>
                                <X className="text-red-500" />
                            </button>
                        </div>
                    </div>
                    <Separator className="my-2 bg-zinc-300"/>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}