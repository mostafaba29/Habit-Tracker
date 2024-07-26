'use client';
import {useQuery} from 'react-query';
import {fetchTasks} from '../utils/api';
import {Check,X} from 'lucide-react';

interface Task {
    id:string;
    name:string;
    done:boolean;
}

interface TaskListProps {
    selectedDate:Date;
}

export default function TaskList ({selectedDate}:TaskListProps) {
    const {data:tasks,isLoading,isError} = useQuery(['tasks',selectedDate],()=>fetchTasks(selectedDate));
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error</div>
    }
    return (
        <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Tasks for {selectedDate.toDateString()}</h2>
      <ul className="space-y-4">
        {tasks?.map((task: Task) => (
          <li key={task.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <span className={task.done ? 'line-through text-gray-500' : ''}>{task.name}</span>
            <div className="space-x-2">
              <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                <Check size={16} />
              </button>
              <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                <X size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    );
}
