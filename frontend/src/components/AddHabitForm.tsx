"use client";
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoffee,faAppleAlt,faRunning} from '@fortawesome/free-solid-svg-icons';
import { HabitCategories ,HabitTypes} from '@/components/Habit';
import axios from 'axios';
const habitSchema = z.object({
    name:z.string().min(1,"Habit name is required").max(50),
    category : z.string().min(1,"Category is required"),
    description:z.string().optional(),
    type:z.string().min(1,"Type is required"),
    repition:z.string().min(1,"Repition is required"),
    startDate:z.string().min(1,"Start Date is required"),
})

interface HabitFormProps{
    isOpen: boolean;
    onClose: () => void;
}
export default function AddHabitForm({isOpen,onClose}:HabitFormProps) {
    const {register,handleSubmit,setValue,formState:{errors}} = useForm({
        resolver:zodResolver(habitSchema),
    })
    const [selectedIcon,setSelectedIcon] = useState<string>("");
    const [selectedCategory,setSelectedCategory] = useState<string>("");
    const [selectedType,setSelectedType] = useState<string>("");

    const icons =[
        {name:'Coffee',icon:faCoffee},
        {name:'Apple',icon:faAppleAlt},
        {name:'Running',icon:faRunning},
    ]
    
    const handleIconSelect = (icon:string)=>{
        setSelectedIcon(icon);
        setValue('habitIcon',icon);
    }

    const handleFormSubmission = async ()=>{
       const formData = new FormData();
       formData.append('name',register('habitName').value);
       formData.append('icon',selectedIcon);
       formData.append('category',selectedCategory);
       formData.append('description',register('habitDescription').value);
       formData.append('type',selectedType);
       formData.append('repition',register('habitRepition').value);
       formData.append('startDate',register('habitStartDate').value);
       try{
        const response = await axios.post('http://localhost:3000/api/v1/habit',formData,
        {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }
        );
        console.log(response);
        onClose();
       }catch(error){
        console.log(error);
       }
    }
    if(!isOpen) return null
    return (
      <div className="flex justify-center items-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-zinc-900">
        <form onSubmit={handleSubmit(handleFormSubmission)} className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6">Add a Habit</h1>
          <div className="mb-4">
            <label htmlFor="habitName" className="block text-sm font-medium text-gray-300 mb-2">
              Habit Name
            </label>
            <input
              id="habitName"
              {...register('habitName')}
              className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.habitName && <p className="mt-1 text-sm text-red-400">{errors.habitName.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select an Icon
            </label>
            <div className="flex space-x-4">
              {icons.map((icon, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={icon.icon}
                  size="2x"
                  className={`cursor-pointer text-gray-400 hover:text-lime-500 transition-colors ${
                    selectedIcon === icon.name ? 'text-blue-500' : ''
                  }`}
                  onClick={() => handleIconSelect(icon.name)}
                />
              ))}
            </div>
            {errors.habitIcon && <p className="mt-1 text-sm text-red-400">{errors.habitIcon.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    );
};
