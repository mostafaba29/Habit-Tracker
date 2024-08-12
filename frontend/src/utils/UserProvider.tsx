'use client';
import {ReactNode} from 'react';
import { useUser } from './hooks/useUser';

type UserProviderProps = {
    children:ReactNode;
}

export function UserProvider({children}:UserProviderProps){
    const {data:data,isLoading,error} = useUser();

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

import {createContext,useContext} from 'react';

const UserContext = createContext<any>(null);

export const useUserContext = ()=> useContext(UserContext);