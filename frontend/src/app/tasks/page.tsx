"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Upperbar from "@/components/Upperbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { TaskGallery } from "@/components/TaskGallery";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/ErrorPage";
import AddTaskForm from "@/components/AddTaskForm";
import EditTaskForm from "@/components/EditTaskForm";
import { fetchTasks,updateTask,completeTask,deleteTask } from "@/utils/api";
import {Task} from "../../components/Types/Task";
import { useUserContext } from '@/utils/UserProvider'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);
export default function Tasks() {
  const [sideBarOpen, setSidebarOpen] = useState(false);
  const [addTaskDialog, setAddTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();
  const user = useUserContext();
  const isLoggedIn = !!user;

  const {data:tasks,isLoading,isError,error}=useQuery({
    queryKey:['tasks'],
    queryFn: fetchTasks,
    staleTime: 1000*60*5,
  })

  const {mutateAsync:updateMutateAsync,isLoading:isUpdateLoading,isError:isUpdateError,error:updateError} = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      MySwal.fire({
        icon: 'success',
        title: 'Task Updated',
      })
    },
    onError: (error) => {
      console.log("Failed to update task", error);
    },
  })

  const {mutateAsync:completeMutateAsync,isLoading:isCompleteLoading,isError:isCompleteError,error:completeError} = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      MySwal.fire({
        icon: 'success',
        title: 'Task Completed',
      })
    },
    onError: (error) => {
      console.log("Failed to complete task", error);
    },
  })

  const {mutateAsync:deleteMutateAsync,isLoading:isDeleteLoading,isError:isDeleteError,error:deleteError} = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      MySwal.fire({
        icon: 'success',
        title: 'Task Deleted',
      })
    },
    onError: (error) => {
      console.log("Failed to delete task", error);
    },
  })

  const handleCompleteTask = async (task:Task) => {
    try {
      await completeMutateAsync(task._id || '');
    } catch (error) {
      console.error("Error completing task:", error);
    }
  }
  
  const handleDeleteTask = async (task:Task) => {
    try {
      await deleteMutateAsync(task._id || '');
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  
  const handleUpdateTask = async (task:Task) => {
    try {
      await updateMutateAsync({ taskId:task._id || '',task:task });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const handleEditTask = (task:Task) =>{
    setEditingTask(task);
  }

  const handleMenuClick = ()=>{
    setSidebarOpen(!sideBarOpen);
  }

  if(isError){
    return (
      <ErrorPage errorMessage={error.message} />
    )
  }

  if(isLoading){
    return(
    <div className="bg-zinc-950 h-screen">
      <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
      {sideBarOpen && <Sidebar open={sideBarOpen} isLoggedIn={false}  />}
      <div className="flex flex-col items-center ">
        <Loading loadingMessage="Loading tasks..." />
      </div>
    </div>
    )
  }

  return (
    <div className="bg-zinc-950 h-screen">
      <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
      {sideBarOpen && <Sidebar open={sideBarOpen} isLoggedIn={isLoggedIn} {...(isLoggedIn && { user })} />}
      <div className="flex flex-col items-center ">
        <div className="flex flex-col items-center justify-around">
        <Button className='my-4 bg-zinc-700 hover:bg-lime-900' onClick={() => setAddTaskDialog(true)}>Add New Task</Button>
          <TaskGallery
            tasks={tasks.tasks}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        </div>
        {addTaskDialog && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <AddTaskForm onClose={() => setAddTaskDialog(false)} />
                </div>
            )}
        {editingTask && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <EditTaskForm task={editingTask} onUpdate={handleUpdateTask} onClose={() => setEditingTask(null)} />
                </div>
            )}
      </div>
    </div>
  );
}
