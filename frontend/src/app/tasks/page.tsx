"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Upperbar from "@/components/Upperbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/TaskForm";
import { TaskGallery } from "@/components/TaskGallery";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  fetchUser,
} from "@/utils/api";
import { Task } from "@/components/Task";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/ErrorPage";

export default function Tasks() {
  const [sideBarOpen, setSidebarOpen] = useState(false);
  const [addTaskDialog, setAddTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const queryclient = useQueryClient();

  //queries
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    isError: tasksError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  //mutations
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const completeTaskMutation = useMutation({
    mutationFn: (id: string) => completeTask(id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  //event handlers
  const handleAddTaksButtonClick = () => {
    setAddTaskDialog(true);
    setEditingTask(undefined);
  };
  const handleAddTaskDialogClose = () => {
    setAddTaskDialog(false);
    setEditingTask(undefined);
  };
  const handleMenuClick = () => setSidebarOpen(!sideBarOpen);

  const handleCreateTask = (newTask: {
    title: string;
    description: string;
    priority: string;
  }) => {
    createTaskMutation.mutate(newTask);
    handleAddTaskDialogClose();
  };
  const handleTaskSubmit = (
    taskData: TaskFormData | (TaskFormData & { id: string })
  ) => {
    if ("id" in taskData) {
      updateTaskMutation.mutate(taskData);
    } else {
      createTaskMutation.mutate(taskData);
    }
    handleAddTaskDialogClose();
  };

  const handleUpdateTask = (task: Task) => {
    setEditingTask(task);
    setAddTaskDialog(true);
  };
  const handleCompleteTask = (id: string) => completeTaskMutation.mutate(id);
  const handleDeleteTask = (id: string) => deleteTaskMutation.mutate(id);

  // if(tasksLoading || userDataLoading) {return (
  //     <>
  //     <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick}/>
  //     <div className="flex flex-row items-start transition-all duration-500">
  //     {sideBarOpen && <Sidebar open={sideBarOpen} />}
  //     <div className="flex flex-grow justify-around">
  //         <Loading loadingMessage={"Loading tasks..."}/>
  //     </div>
  //     </div>
  //     </>
  // )}
  // if(tasksError || userDataError) {
  //     const errorMessage = tasksError
  //         ? (tasksError as Error)?.message || "Failed to load tasks"
  //         : (userDataError as Error)?.message || "Failed to load user data";
  //     return <ErrorPage errorMessage={errorMessage} />;
  // }

  return (
    <div className="bg-zinc-950 h-screen">
      <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleMenuClick} />
      <div className="flex flex-row items-start transition-all duration-500">
        {sideBarOpen && <Sidebar open={sideBarOpen} />}
        <div className="flex flex-grow justify-around">
          <Button
            className="my-4 bg-zinc-700 hover:bg-lime-900"
            onClick={handleAddTaksButtonClick}
          >
            Add New Task
          </Button>
          <TaskForm
            isOpen={addTaskDialog}
            onClose={handleAddTaskDialogClose}
            onSubmit={handleTaskSubmit}
            task={editingTask}
          />
          <TaskGallery
            tasks={tasks}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
            onEdit={handleUpdateTask}
          />
        </div>
      </div>
    </div>
  );
}
