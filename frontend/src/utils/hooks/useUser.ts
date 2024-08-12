import {useQuery} from '@tanstack/react-query';
import { fetchUser } from '../api';

export function useUser() {
    return useQuery({
        queryKey:['user'],
        queryFn: fetchUser,
        staleTime : 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    })
}