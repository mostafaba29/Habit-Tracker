'use client';
import {ReactNode} from 'react';
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {useState} from 'react';


export default function ReactQueryProvider({children}:{children:ReactNode}){
    const [client] = useState(()=>new QueryClient());

    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
  );
}