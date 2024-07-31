"use client";
import {useState,useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import { Task,taskPriority} from '@/components/Task';
import {createTask,updateTask} from '@/utils/api';
import {useMutation,useQueryClient} from '@tanstack/react-query';


const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(50),
  description: z.string().optional(),
  priority: z.enum(taskPriority),
});

type TaskFormData = z.infer<typeof taskSchema>;


interface TaskFormProps{
    isOpen: boolean;
    onClose: () => void;
    task?:Task;
    onSubmit: () => void;
}
export default function TaskForm({isOpen,onClose,task,onSubmit}:TaskFormProps) {
    const queryClient = useQueryClient();
    const {register,handleSubmit,reset,formState:{errors}} = useForm<TaskFormData>({
        resolver:zodResolver(taskSchema),
        defaultValues: task ? {
          title: task.title,
          description: task.description,
          priority: task.priority,
        } : undefined,
    })



    useEffect(() => {
      if (task) {
        reset({
          title: task.title,
          description: task.description,
          priority: task.priority,
        });
      } else {
        reset({
          title: '',
          description: '',
          priority: 'low',
        });
      }
    }, [task, reset]);

    const handleFormSubmission = (data: TaskFormData) => {
      onSubmit(task ? { id: task._id, ...data } : data);
      onClose();
    };

    if(!isOpen) return null
    return (
      <div className="flex justify-center items-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-zinc-900">
      <form onSubmit={handleSubmit(handleFormSubmission)} className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">{task ? 'Edit Task' : 'Add a Task'}</h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            id="title"
            {...register('title')}
            className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">
            Priority
          </label>
          <select
            id="priority"
            {...register('priority')}
            className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {taskPriority.map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
          {errors.priority && <p className="mt-1 text-sm text-red-400">{errors.priority.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 transition-colors"
        >
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
    );
};
