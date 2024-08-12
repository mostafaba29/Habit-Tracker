import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Task } from './Types/Task';
const priorityColors = {
    low: 'bg-green-200 text-green-800',
    medium: 'bg-yellow-200 text-yellow-800',
    high: 'bg-red-200 text-red-800'
}

interface TaskCardProps {
    task:Task;
    onComplete: (task: Task) => void;
    onDelete: (task: Task) => void;
    onEdit: (task: Task) => void;
}
export default function TaskCard({ task, onComplete, onDelete, onEdit }: TaskCardProps) {
        return (
            <div className="bg-zinc-100 rounded-lg shadow-md p-4 m-2 w-[400px] h-[175px]">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-500 mb-4 h-[75px] overflow-auto">{task.description}</p>
              <div className="flex justify-between ">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                {task.time && <p className="text-gray-500 text-sm">Time: {task.time} min</p>}
                <div className='space-x-3' >
                  <button onClick={() => onComplete(task)} className="text-green-500 hover:text-green-700">
                    <FontAwesomeIcon icon={faCheck} size='lg'/>
                  </button>
                  <button onClick={() => onDelete(task)} className="text-red-500 hover:text-red-700">
                    <FontAwesomeIcon icon={faTrashCan} size='lg' />
                  </button>
                  <button onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faPencil} size='lg'/>
                  </button>
                </div>      
              </div>
            </div>
          );
}