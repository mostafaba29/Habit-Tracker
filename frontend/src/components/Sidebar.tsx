import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import clsx from 'clsx';
import Link from 'next/link';
import {User} from '@/components/Types/User';
import {useQueryClient,useMutation} from '@tanstack/react-query';
import { userLogout } from '@/utils/api';
interface SidebarProps {
    open: boolean;
    isLoggedIn: boolean;
    user?:User;
}

export default function Sidebar({ open, isLoggedIn, user }: SidebarProps) {

    const queryClient = useQueryClient();
    const getInitials = (name: string) => {
        const nameParts = name.split(' ');
        return nameParts.map(part => part[0]).join('').toUpperCase();
    }

    const logoutMutation = useMutation({
        mutationFn: userLogout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['habits'] });
            window.location.href='/login';

        },
        onError: () => {
            console.error('Error logging out');
        }
    })

    const handleLogout = () => {
        logoutMutation.mutate();
    }
    return (
        <div className={clsx('absolute z-10 top-0 left-0 bg-zinc-800 w-[225px] h-screen transition-transform duration-300', { 'transform -translate-x-full': !open, 'transform translate-x-0': open })}>
            <div className="flex flex-col items-center justify-items-center pt-28">
            {isLoggedIn ? (
                <>
                {/* <Avatar>
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                </Avatar>  */}
                <h2 className='text-slate-200 m-2'>{user?.name}</h2>
                <Link className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' href='/'>Home</Link>
                <Link className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' href='/habits'>Habits</Link>
                <Link className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' href='/tasks'>Tasks</Link>
                <Link className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' href='/stats'>Stats</Link>
                <button 
                className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' 
                onClick={()=>handleLogout()}
                >
                Logout
                </button>
            </>
            ) : (
            <Link 
                className='text-lime-600 font-medium w-full text-center my-1 px-12 py-2 hover:bg-zinc-700 hover:text-lime-400 transition-all duration-300 ease-in-out' 
                href='/login'
            >
                Login
            </Link>
            )}
            </div>
        </div>
    );
}