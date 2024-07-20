"use client";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Avatar,AvatarFallback,AvatarImage } from "@radix-ui/react-avatar";
import clsx from 'clsx';
import Link from 'next/link';
interface Sidebarprops {
    userLoggedIn:boolean;
    open:boolean;
    userName:string;
    userImage:string;
}
export default function Sidebar({open,userLoggedIn,userName,userImage}:Sidebarprops) {
    const getInitials = (name:string) => {
        const nameParts = name.split(' ');
        const initials = nameParts.map(part => part[0]).join('');
        return initials;
    }

    const initials = getInitials(userName);
    return (
        <div className={clsx('bg-zinc-800 w-36 h-screen transition-transform duration-300',{'transform -translate-x-full':!open, 'transform translate-x-0':open})}>
            <div className="flex flex-col items-center justify-center pt-28">
            <Avatar>
                <AvatarImage src={userImage} className='rounded-full h-28 w-28 p-2 object-cover ' />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <h2 className='text-slate-200 m-2'>{userName}</h2>
            <Link className='text-lime-600 font-medium my-1 px-12 py-1 hover:bg-lime-950 hover:text-slate-300 transition-all duration-300 ease-in-out' href='/'>Home</Link>
            <Link className='text-lime-600 font-medium my-1 px-12 py-1 hover:bg-lime-950 hover:text-slate-300 transition-all duration-300 ease-in-out' href='/habits'>Habits</Link>
            <Link className='text-lime-600 font-medium my-1 px-12 py-1 hover:bg-lime-950 hover:text-slate-300 transition-all duration-300 ease-in-out' href='/stats'>Stats</Link>
            {userLoggedIn? (
                < Link className='text-lime-600 font-medium my-1 px-12 py-1 hover:bg-lime-950 hover:text-slate-300 transition-all duration-300 ease-in-out' href='/auth/login'>Login</Link>
            ):
            (
                <Link className='text-lime-600 font-medium my-1 px-12 py-1 hover:bg-lime-950 hover:text-slate-300 transition-all duration-300 ease-in-out' href='/auth/logout'>Logout</Link>
            )}
            </div>
        </div>
    );
}