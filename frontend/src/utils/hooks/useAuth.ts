// import { useMutation, useQuery, useQueryClient } from 'react-query';
// import axios from 'axios';

// const API_URL = 'https://localhost:3000/api/v1';

// interface User {
//   id: string;
//   name: string;
//   mobileNumber: string;
// }

// interface LoginCredentials {
//   mobileNumber : string;
// }

// interface SignupData {
//   name: string;
//   mobileNumber: string;
// }

// const authAxios = axios.create({
//   baseURL: API_URL,
// })

// authAxios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });



// export const useLogin = () => {
//   const queryClient = useQueryClient();
//   return useMutation<{ user: User; token: string }, Error, LoginCredentials>(
//     (credentials) => authAxios.post('/login', credentials).then((res) => res.data),
//     {
//       onSuccess: (data) => {
//         queryClient.setQueryData(['user'], data.user);
//         localStorage.setItem('token', data.token);
//       },
//     }
//   );
// };

// export const useSignup = () => {
//   const queryClient = useQueryClient();
//   return useMutation<{ user: User; token: string }, Error, SignupData>(
//     (userData) => authAxios.post('/signup', userData).then((res) => res.data),
//     {
//       onSuccess: (data) => {
//         queryClient.setQueryData(['user'], data.user);
//         localStorage.setItem('token', data.token);
//       },
//     }
//   );
// };
// export const useLogout = () => {
//   const queryClient = useQueryClient();
//   return useMutation<void, Error>(
//     () => authAxios.post('/logout').then(() => {}),
//     {
//       onSuccess: () => {
//         queryClient.setQueryData(['user'], null);
//         localStorage.removeItem('token');
//       },
//     }
//   );
// };

// export const useUser = () => {
//   return useQuery<User | null>(
//     ['user'],
//     async () => {
//       try {
//         const response = await authAxios.get('/user');
//         return response.data;
//       } catch (error) {
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//           // Unauthorized, clear the token
//           localStorage.removeItem('token');
//           return null;
//         }
//         throw error;
//       }
//     },
//     {
//       retry: false,
//       refetchOnWindowFocus: false,
//       staleTime: 300000, // 5 minutes
//     }
//   );
// };