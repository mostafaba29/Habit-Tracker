import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faBed, faBook, faAppleWhole, faDumbbell, faWater } from '@fortawesome/free-solid-svg-icons';
import { X } from 'lucide-react';
import { Habit } from './Types/Habit';

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

type HabitFormData = z.infer<typeof habitSchema>;

// interface Habit extends HabitFormData {
//   id: string;
//   // Add any other fields that might be in your Habit type
// }

interface EditHabitFormProps {
  habit: Habit;
  onUpdate: (updatedHabit: Habit) => void;
  onClose: () => void;
}

export default function EditHabitForm({ habit, onUpdate, onClose }: EditHabitFormProps) {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedDates, setSelectedDates] = useState<number[]>([]);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      title: habit.title,
      description: habit.description,
      icon: habit.icon,
      frequency: habit.frequency,
      duration: habit.duration,
      occurrencesPerDay: habit.occurrencesPerDay,
    },
  });

  const frequency = watch('frequency');

  useEffect(() => {
    if (habit.habitDates) {
      const dates = habit.habitDates.map(dateString => new Date(dateString));
      if (habit.frequency === 'weekly') {
        setSelectedDays(dates.map(date => date.getDay()));
      } else if (habit.frequency === 'monthly') {
        setSelectedDates(dates.map(date => date.getDate()));
      }
    }
  }, [habit]);

  const onSubmit = (data: HabitFormData) => {
    const formattedData = {
      ...data,
      habitDates: formatHabitDates(data.frequency, selectedDays, selectedDates),
    };
    onUpdate({ ...habit, ...formattedData });
    onClose();
  };

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-800 p-6 rounded-lg shadow-lg w-[30%] max-h-[90%] overflow-y-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Edit Habit</h2>
          <X className="w-6 h-6 text-white cursor-pointer hover:text-red-600" onClick={onClose} />
        </div>

        <div>
          <label className="block mb-1 text-white">Habit Name</label>
          <input
            {...register('title')}
            className="w-full p-2 bg-zinc-700 text-white rounded shadow-md"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-white">Description (optional)</label>
          <textarea
            {...register('description')}
            className="w-full p-2 bg-zinc-700 text-white rounded shadow-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-white">Icon</label>
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
        </div>

        <div>
          <label className="block mb-1 text-white">Frequency</label>
          <select {...register('frequency')} className="w-full p-2 bg-zinc-700 text-white rounded shadow-md">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {habit.duration !== undefined && (
          <div>
            <label className="block mb-1 text-white">Duration (minutes)</label>
            <input
              type="number"
              {...register('duration', { valueAsNumber: true })}
              className="w-full p-2 bg-zinc-700 text-white rounded shadow-md"
            />
          </div>
        )}

        {habit.occurrencesPerDay !== undefined && (
          <div>
            <label className="block mb-1 text-white">Occurrences per day</label>
            <input
              type="number"
              {...register('occurrencesPerDay', { valueAsNumber: true })}
              className="w-full p-2 bg-zinc-700 text-white rounded shadow-md"
            />
          </div>
        )}

        {frequency === 'weekly' && (
          <div>
            <label className="block mb-1 text-white">Days of the week</label>
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
          </div>
        )}

        {frequency === 'monthly' && (
          <div>
            <label className="block mb-1 text-white">Dates of the month</label>
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
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <Button type="button" onClick={onClose} className="bg-zinc-600 text-white hover:bg-zinc-500">
            Cancel
          </Button>
          <Button type="submit" className="bg-lime-600 text-white hover:bg-lime-500">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}