"use client";
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {createTask} from '@/utils/api';
import { X } from 'lucide-react';

const taskTitleSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
});

const taskPrioritySchema = z.object({
  priority: z.enum(["low", "medium", "high"]),
});

const taskDurationSchema = z.object({
  time: z.number().optional(),
});

const taskSchema = taskTitleSchema.merge(taskPrioritySchema).merge(taskDurationSchema);

type taskFormData = z.infer<typeof taskSchema>;

interface addTaskFormProps {
  onClose: () => void;
}

export default function AddTaskForm({ onClose }: addTaskFormProps) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<taskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const taskPriority = watch("priority");

  const queryClient = useQueryClient();
  const {mutateAsync,isLoading,isError,error} = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose();
    },
    onError: (error) => {
      console.log("Failed to create task", error);
    },
  })

  const onSubmit: SubmitHandler<taskFormData> = (data: taskFormData) => {
    try{
      mutateAsync(data);
    }catch(error){
      console.log(error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <label className="text-md ml-1 text-white">Task Title : </label>
            <input
              {...register('title')}
              placeholder="Type the title of this task ..."
              className="w-full p-2 mb-2 border border-zinc-900 rounded text-white bg-zinc-600"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            <label className="text-md ml-1 text-white">Task Description : ( optional ) </label>
            <input
              {...register('description')}
              placeholder="Type the description of this task ..."
              className="w-full p-2 mb-2 border border-zinc-900 rounded text-white bg-zinc-600"
            />
          </>
        );
      case 2:
        return (
          <>
            <label className="text-md ml-1 text-white">Task Priority:</label>
            <div className="mb-4 ">
              <div className="flex items-center mb-2 ">
                <input
                  type="radio"
                  id="low"
                  value="low"
                  {...register('priority')}
                  className="mx-2"
                />
                <label htmlFor="low" className=" text-green-500">Low</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="medium"
                  value="medium"
                  {...register('priority')}
                  className="mx-2"
                />
                <label htmlFor="medium" className="text-yellow-500">Medium</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="high"
                  value="high"
                  {...register('priority')}
                  className="mx-2"
                />
                <label htmlFor="high" className="text-red-500">High</label>
              </div>
            </div>
            {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
          </>
        );
      case 3:
        return (
          <>
            <label className="text-md ml-1 text-white">Time to Complete (in minutes, optional):</label>
            <input
              type="number"
              {...register('time', { valueAsNumber: true })}
              placeholder="Time in minutes"
              className="w-full p-2 mb-2 border rounded border-zinc-900 text-white bg-zinc-600"
            />
            {errors.time && <p className="text-red-500">{errors.time.message}</p>}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-800 p-6 rounded-lg shadow-lg w-[30%] h-[50%] flex flex-col justify-between">
      <div className="flex justify-between">
      <h2 className="text-2xl font-bold mb-4 text-white">Add New Task</h2>
      <X className="w-6 h-6 text-white cursor-pointer hover:text-red-600" onClick={onClose} />
      </div>
      {renderStep()}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <Button type="button" onClick={() => setStep(step - 1)} className="bg-zinc-500 text-white hover:bg-zinc-600 w-[20%]">
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button type="button" onClick={() => setStep(step + 1)} className="bg-lime-600 text-white hover:bg-lime-800 w-[20%]">
            Next
          </Button>
        ) : (
          <Button type="submit" className="bg-lime-600 text-white hover:bg-lime-800 w-[20%]">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}