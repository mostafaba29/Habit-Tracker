"use client";
import {useState} from 'react';
import HabitGallery from "@/components/HabitGallery";
import {Habit} from '@/components/Types/Habit';
import Upperbar from "@/components/Upperbar";
import Sidebar from "@/components/Sidebar";
import {Button} from '@/components/ui/button';
import AddHabitForm from '@/components/AddHabitForm';
import Calendar from '@/components/Calendar';
import { useUserContext } from '@/utils/UserProvider'
import { useQueryClient,useQuery ,useMutation} from '@tanstack/react-query';
import { fetchHabits,updateHabit,completeHabit,deleteHabit } from '@/utils/api';
import Loading from '@/components/Loading';
import EditHabitForm from '@/components/EditHabitForm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);
export default function Habits() {
    const [sideBarOpen,setSidebarOpen] =useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddHabitForm, setShowAddHabitForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
    const user = useUserContext();
    const isLoggedIn = !!user;

    const queryClient = useQueryClient();
    const {data:habits,isLoading,error} = useQuery({
        queryKey:['habits'],
        queryFn:fetchHabits,
        staleTime : 1000 * 60 * 5,
    })

    const {mutateAsync:updateMutateAsync,isLoading:isUpdateLoading,isError:isUpdateError,error:updateError} = useMutation({
        mutationFn: updateHabit,
        onSuccess: () => {
          queryClient.invalidateQueries(['habits']);
          MySwal.fire({
            icon: 'success',
            title: 'habit Updated',
          })
        },
        onError: (error) => {
          console.log("Failed to update habit", error);
        },
      })
    
      const {mutateAsync:completeMutateAsync,isLoading:isCompleteLoading,isError:isCompleteError,error:completeError} = useMutation({
        mutationFn: completeHabit,
        onSuccess: () => {
          queryClient.invalidateQueries(['habits']);
          MySwal.fire({
            icon: 'success',
            title: 'habit Completed',
          })
        },
        onError: (error) => {
          console.log("Failed to complete habit", error);
        },
      })
    
      const {mutateAsync:deleteMutateAsync,isLoading:isDeleteLoading,isError:isDeleteError,error:deleteError} = useMutation({
        mutationFn: deleteHabit,
        onSuccess: () => {
          queryClient.invalidateQueries(['habits']);
          MySwal.fire({
            icon: 'success',
            title: 'habit Deleted',
          })
        },
        onError: (error) => {
          console.log("Failed to delete habit", error);
        },
      })
    
      const handleCompleteHabit = async (habit:Habit) => {
        try {
          await completeMutateAsync(habit._id || '');
        } catch (error) {
          console.error("Error completing habit:", error);
        }
      }
      
      const handleDeleteHabit = async (habit:Habit) => {
        try {
          await deleteMutateAsync(habit._id || '');
        } catch (error) {
          console.error("Error deleting habit:", error);
        }
      }
      
      const handleUpdateHabit = async (habit:Habit) => {
        try {
          await updateMutateAsync({ habitId:habit._id || '',habit:habit });
        } catch (error) {
          console.error("Error updating habit:", error);
        }
      }
    
      const handleEditHabit = (habit:Habit) =>{
        setEditingHabit(habit);
      }

  
    const handleMenuClick = ()=>{
      setSidebarOpen(!sideBarOpen);
      console.log(habits.habits);
    }

    if(isLoading){
        return(
        <div className="bg-zinc-950 h-screen">
            <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
            {sideBarOpen && <Sidebar open={sideBarOpen} isLoggedIn={isLoggedIn} {...(isLoggedIn && { user })} />}
            <div className="flex flex-col items-center ">
            <Calendar selectedDate={selectedDate} onSelectedDate={setSelectedDate}  />
            <Loading loadingMessage="Loading habits..." />
        </div>
    </div>
        )
    }
    return (
    <div className="bg-zinc-950 h-screen">
        <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
        {sideBarOpen && <Sidebar open={sideBarOpen} isLoggedIn={isLoggedIn} {...(isLoggedIn && { user })} />}
        <div className="flex flex-col items-center ">
        <Calendar selectedDate={selectedDate} onSelectedDate={setSelectedDate}  />
        <div className='flex flex-row items-end justify-around px-7 w-[90%]'>
            <h2 className='text-2xl font-bold mb-4 text-white'>{selectedDate.toDateString()} habits</h2>
            <Button className='my-4 bg-zinc-700 hover:bg-lime-900' onClick={() => setShowAddHabitForm(true)}>Add New Habit</Button>
        </div>
            <HabitGallery habits={habits.habits} onComplete={handleCompleteHabit} onDelete={handleDeleteHabit} onEdit={handleEditHabit}  />
            {showAddHabitForm && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <AddHabitForm onClose={() => setShowAddHabitForm(false)} />
                </div>
            )}
            {editingHabit && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <EditHabitForm habit={editingHabit} onClose={() => setEditingHabit(null)} onUpdate={handleUpdateHabit}/>
                </div>
            )}
        </div>
    </div>
    );
}