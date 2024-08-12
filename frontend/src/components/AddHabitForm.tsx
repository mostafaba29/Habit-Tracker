"use client";
import { useState } from 'react';
import {useForm,SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import {Button} from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faBed, faBook, faAppleWhole, faDumbbell, faWater } from '@fortawesome/free-solid-svg-icons';
import { X } from 'lucide-react';
import {createHabit} from '@/utils/api';

const icons = [
  { icon: faRunning, name: 'running' },
  { icon: faBed, name: 'bed' },
  { icon: faBook, name: 'book' },
  { icon: faAppleWhole, name: 'apple' },
  { icon: faDumbbell, name: 'dumbbell' },
  { icon: faWater, name: 'water' },
];

const habitSchema = z.object({
  title: z.string().min(1, "Habit title is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  frequency: z.enum(["daily", "weekly", "monthly"]),
  duration: z.number().optional(),
  occurrencesPerDay: z.number().optional(),
  habitDates: z.array(z.string().datetime()).optional(),
});

type habitFormData = z.infer<typeof habitSchema>;

type HabitType = 'yesNo' | 'timed' | 'repetitive';

interface addHabitFormProps {
  onClose: () => void;
}
export default function AddHabitForm({ onClose }: addHabitFormProps) {
  const [step,setStep]=useState(1);
  const [habitType, setHabitType] = useState<HabitType>('yesNo');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const {register,handleSubmit,watch,setValue,formState:{errors}} = useForm<habitFormData>({
    resolver: zodResolver(habitSchema)
});

  const frequency = watch("frequency");

  const queryClient = useQueryClient();
  const {mutateAsync,isLoading,isError,error} = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      onClose();
    },
    onError: (error) => {
      console.log("Failed to create habit", error);
    },
  })

  const onSubmit: SubmitHandler<habitFormData> = (data: habitFormData) => {
    const formattedData = {
      ...data,
      habitDates: formatHabitDates(data.frequency, selectedDays, selectedDates),
    };
    console.log("Formatted form data:", formattedData);
    try{
      mutateAsync(formattedData);
    }catch(error){
      console.log(error);
    }
  }

  const formatHabitDates = (frequency: string, days: number[], dates: number[]): string[] => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
  
    switch (frequency) {
      case 'weekly':
        return days.map(day => {
          const d = new Date(year, month, now.getDate() + (day - now.getDay() + 7) % 7);
          return d.toISOString();
        });
      case 'monthly':
        return dates.map(date => {
          const d = new Date(year, month, date);
          return d.toISOString();
        });
      default:
        return [now.toISOString()];
    }
  }

  const renderStep = ()=>{
    switch(step){
      case 1:
        return (
          <>
            <label className="text-md ml-1 text-white">Habit Name : </label>
            <input
              {...register('title')}
              placeholder="Type the name you want for this habit ..."
              className="w-full p-2 mb-2 border border-zinc-900 rounded text-white bg-zinc-600"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            <label className="text-md ml-1 text-white">Habit Description : ( optional ) </label>
            <input
              {...register('description')}
              placeholder="Type the description of this habit ..."
              className="w-full p-2 mb-2 border border-zinc-900 rounded text-white bg-zinc-600"
            />
          </>
        );
      case 2:
        return (
          <>
            <label className="text-md ml-1 text-white">Select an Icon:</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {icons.map((iconObj) => (
                <button
                  key={iconObj.name}
                  type="button"
                  onClick={() => setValue('icon', iconObj.name)}
                  className={`p-2 rounded ${watch('icon') === iconObj.name ? 'bg-lime-600' : 'bg-zinc-600'}`}
                >
                  <FontAwesomeIcon icon={iconObj.icon} size="2x" className='w-8 h-8' />
                </button>
              ))}
            </div>
            <label className="text-md ml-1 text-white">Frequency:</label>
            <select {...register('frequency')} className="w-full p-2 mb-2 border rounded border-zinc-900 text-white bg-zinc-600">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </>
        );
      case 3:
        return (
          <>
            <label className="text-md ml-1 text-white">Habit Type:</label>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="yesNo"
                  value="yesNo"
                  checked={habitType === 'yesNo'}
                  onChange={() => setHabitType('yesNo')}
                  className="mx-2"
                />
                <label htmlFor="yesNo" className="text-white">Yes or No</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="timed"
                  value="timed"
                  checked={habitType === 'timed'}
                  onChange={() => setHabitType('timed')}
                  className="mx-2"
                />
                <label htmlFor="timed" className="text-white">Timed</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="repetitive"
                  value="repetitive"
                  checked={habitType === 'repetitive'}
                  onChange={() => setHabitType('repetitive')}
                  className="mx-2"
                />
                <label htmlFor="repetitive" className="text-white">Repetitive</label>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            {habitType === 'timed' && (
              <>
                <label className="text-md ml-1 text-white">Duration (in minutes):</label>
                <input
                  type="number"
                  {...register('duration', { valueAsNumber: true })}
                  placeholder="Duration in minutes"
                  className="w-full p-2 mb-2 border rounded border-zinc-900 text-white bg-zinc-600"
                />
              </>
            )}
            {habitType === 'repetitive' && (
              <>
                <label className="text-md ml-1 text-white">Occurrences per day:</label>
                <input
                  type="number"
                  {...register('occurrencesPerDay', { valueAsNumber: true })}
                  placeholder="Number of times"
                  className="w-full p-2 mb-2 border rounded border-zinc-900 text-white bg-zinc-600"
                />
              </>
            )}
            {frequency === 'weekly' && (
            <div className="flex flex-wrap gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <label key={day} className={`flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer hover:bg-zinc-600 ${selectedDays.includes(index) ? 'bg-lime-600' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(index)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDays([...selectedDays, index]);
                      } else {
                        setSelectedDays(selectedDays.filter(d => d !== index));
                      }
                    }}
                    className="hidden"
                  />
                  {day}
                </label>
                ))}
              </div>
            )}
            {frequency === 'monthly' && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                    <label key={date} className={`flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer hover:bg-zinc-600 ${selectedDates.includes(date) ? 'bg-lime-600' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedDates.includes(date)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDates([...selectedDates, date]);
                          } else {
                            setSelectedDates(selectedDates.filter(d => d !== date));
                          }
                        }}
                        className="hidden"
                      />
                      {date}
                    </label>
                  ))}
                </div>
              )}
          </>
        );
        default:
          return null;
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-800 p-6 rounded-lg shadow-lg w-[30%] h-[40%] flex flex-col justify-between">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-white">Add New Habit</h2>
        <X className="w-6 h-6 text-white cursor-pointer hover:text-red-600" onClick={onClose} />
      </div>
      {renderStep()}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <Button type="button" onClick={() => setStep(step - 1)} className="bg-zinc-500 text-white hover:bg-zinc-600 w-[20%]">
            Previous
          </Button>
        )}
        {step < 4 ? (
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
};



