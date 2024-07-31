'use client';
import {ReactNode} from 'react';
import { SessionProvider } from 'next-auth/react';
import {useState} from 'react';


export default function ReactQueryProvider({children}:{children:ReactNode}){

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
  );
}