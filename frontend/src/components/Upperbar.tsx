import { Menu } from "lucide-react";
import clsx from 'clsx';

interface UpperbarProps {
    sideBarOpen:boolean;
    handleMenuClick:()=>void;
}

export default function Upperbar({sideBarOpen,handleMenuClick}:UpperbarProps){
    return (
        <div className='h-16 bg-zinc-800'>
            <Menu className={clsx(
                'z-20 text-slate-100 absolute top-4 left-4 h-8 w-auto hover:text-slate-500 hover:cursor-pointer transition-transform duration-300 ease-in-out',
            {'rotate-90':sideBarOpen})
            } onClick={handleMenuClick}/>
            <h3 className='text-slate-100 font-bold text-center pt-4'>if you want something done right you gotta do it yourself</h3>
        </div>
    );
}