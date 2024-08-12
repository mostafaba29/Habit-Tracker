import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { Task } from './Types/Task';

const schema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  time: z.string().optional(),
});

type TaskFormData = z.infer<typeof schema>;

interface EditTaskFormProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onClose: () => void;
}

export default function EditTaskForm({ task, onUpdate, onClose }: EditTaskFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      time: task.time,
    },
  });

  const onSubmit = (data: TaskFormData) => {
    onUpdate({ ...task, ...data });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-800 p-6 rounded-lg shadow-lg w-[30%] h-[50%] flex flex-col justify-between gap-1">
            <h2 className="text-2xl font-bold mb-4 text-white">Edit Task</h2>
          <div>
            <label className="block mb-1 text-white">Title</label>
            <input {...register('title')} className="w-full p-2 bg-zinc-700 text-white rounded shadow-md" />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-white">Description</label>
            <textarea {...register('description')} className="w-full p-2 bg-zinc-700 text-white rounded shadow-md" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-white">Priority</label>
            <select {...register('priority')} className="w-full p-2 bg-zinc-700 text-white rounded shadow-md">
              <option value="low" className='text-green-400 p-1'>Low</option>
              <option value="medium" className='text-yellow-400 p-1'>Medium</option>
              <option value="high" className='text-red-400 p-1'>High</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-white">Time (optional)</label>
            <input {...register('time')} type="text" className="w-full p-2 bg-zinc-700 text-white rounded shadow-md" />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-500 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-500">Update</button>
          </div>
        </form>
    </div>
  );
}