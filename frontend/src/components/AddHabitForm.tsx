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
}
export default function AddHabitForm({isOpen}:HabitFormProps) {
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
        const response = await axios.post('http://localhost:3000/api/v1/habit',formData);
        console.log(response);
       }catch(error){
        console.log(error);
       }
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmission)}>
      <h1>Add a Habit</h1>
      <div>
        <label htmlFor="habitName">Habit Name</label>
        <input id="habitName" {...register('habitName')} />
        {errors.habitName && <p>{errors.habitName.message}</p>}
      </div>
      <div className="icon-selection">
        {icons.map((icon, index) => (
          <FontAwesomeIcon
            key={index}
            icon={icon.icon}
            size="2x"
            className={`habit-icon ${selectedIcon === icon.name ? 'selected' : ''}`}
            onClick={() => handleIconSelect(icon.name)}
          />
        ))}
        {errors.habitIcon && <p>{errors.habitIcon.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
