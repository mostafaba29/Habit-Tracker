import  TaskCard  from './TaskCard';
import { Task } from './Task';
interface TaskGalleryProps {
    tasks: Task[];
    onComplete: (task: Task) => void;
    onDelete: (task: Task) => void;
    onEdit: (task: Task) => void;
}
export const TaskGallery = ({ tasks, onComplete, onDelete, onEdit }: TaskGalleryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};