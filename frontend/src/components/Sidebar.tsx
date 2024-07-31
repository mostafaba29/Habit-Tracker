'use client';
import { Avatar,AvatarFallback,AvatarImage } from "@radix-ui/react-avatar";
import clsx from 'clsx';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
interface Sidebarprops {
    open:boolean;
}
export default function Sidebar({open}:Sidebarprops) {
    const { data: session, status } = useSession();
    const [initials, setInitials] = useState('');
    useEffect(() => {
        if (session?.user?.name) {
            setInitials(getInitials(session.user.name));
        }
    }, [session]);

    const getInitials = (name: string) => {
        const nameParts = name.split(' ');
        return nameParts.map(part => part[0]).join('').toUpperCase();
    }

    return (
        <div className={clsx('absolute z-10 top-0 left-0 bg-zinc-800 w-[175px] h-screen transition-transform duration-300',{'transform -translate-x-full':!open, 'transform translate-x-0':open})}>
            <div className="flex flex-col items-center justify-center pt-28">
            {status === 'authenticated' && session?.user ? (
                    <>
                        <Avatar>
                            <AvatarImage src={session.user.image || ''} className='rounded-full h-28 w-28 p-2 object-cover' />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <h2 className='text-slate-200 m-2'>{session.user.name}</h2>
                    </>
                ) : (
                    <div className="h-28 w-28 bg-zinc-700 rounded-full mb-2"></div>
            )}
            <Link className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' href='/'>Home</Link>
            <Link className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' href='/habits'>Habits</Link>
            <Link className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' href='/tasks'>Tasks</Link>
            <Link className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' href='/stats'>Stats</Link>
            {status === 'loading' ? (
                    <div className="text-slate-200">Loading user data</div>
            ) : status === 'authenticated' ? (
                    <button 
                        className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' 
                        onClick={() => signOut()}
                    >
                        Logout
                    </button>
                ) : (
                    <button 
                        className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' 
                        onClick={() => signIn('google')}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}