import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Task } from './Task';
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
            <div className="bg-white rounded-lg shadow-md p-4 m-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="flex justify-end space-x-2">
                <button onClick={() => onComplete(task)} className="text-green-500 hover:text-green-700">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={() => onDelete(task)} className="text-red-500 hover:text-red-700">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <button onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-700">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          );
}