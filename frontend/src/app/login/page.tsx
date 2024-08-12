'use client';
import {useState} from "react";
import Upperbar from "@/components/Upperbar";
import Sidebar from "@/components/Sidebar";
import LoginForm from "@/components/LoginForm";
import {useUserContext} from "@/utils/UserProvider";

export default function Login(){
    const [sideBarOpen,setSidebarOpen] =useState(false);
    const user = useUserContext();
    const isLoggedIn = !!user;
    const handleSideBarMenuClick = ()=>{
        setSidebarOpen(!sideBarOpen);
    }
    return (
        <>
            <Upperbar sideBarOpen={sideBarOpen} handleMenuClick={handleSideBarMenuClick} />
            {sideBarOpen && <Sidebar open={sideBarOpen} isLoggedIn={isLoggedIn} {...(isLoggedIn && { user })} />}
            <div className="flex flex-col w-full h-[93vh] items-center justify-center bg-zinc-900">
                <h1 className="text-3xl text-white mb-5">welcome to habit tracker</h1>
                <h2 className="text-xl text-white mb-5">please login to continue</h2>
                <LoginForm />
            </div>
        </>
    )
}