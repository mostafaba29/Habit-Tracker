import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { Button } from '@/components/ui/button';
import { userLogin } from '@/utils/api';

const loginSchema = z.object({
    phone: z.string().min(11, "Mobile number should be 11 digits").max(11, "Mobile number should be 11 digits"),
    password: z.string().min(1, "Password is required"),
})

type loginFormData = z.infer<typeof loginSchema >;
export default function LoginForm() {

    const queryClient = useQueryClient();
    const {mutateAsync,isLoading,isError, error} = useMutation({
      mutationFn: userLogin,
      onSuccess: (data) => {
        window.location.href='/' 
      },
      onError:(error) => {
        console.log('Login failed',error);
      }
    })

    const {register,handleSubmit,formState:{errors}} = useForm<loginFormData>({
        resolver: zodResolver(loginSchema)
    })
  const onSubmit = async(data: loginFormData) => {
    try {
      await mutateAsync({
        phone:data.phone,
        password: data.password
      });
      }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[400px] bg-zinc-800 p-5 rounded-2xl shadow-lg">
      <label className='text-lg text-white'>Mobile number</label>
      <input
        {...register('phone')}
        type='tel'
        placeholder='type your mobile number here ...'
        className='w-full p-2 bg-zinc-700 text-white rounded shadow-md'
      />
      {errors.phone && <p className='text-red-500 text-sm mt-1>'>{errors.phone.message}</p>}
      <label className='text-lg text-white '>Password</label>
      <input 
        {...register('password')}
        type='password'
        placeholder='type your password here ...'
        className='w-full p-2 bg-zinc-700 text-white rounded shadow-md'
      />
      {errors.password && <p className='text-red-500 text-sm mt-1>'>{errors.password.message}</p>}
      <Button
        type="submit"
        className="w-full bg-lime-500 text-white p-2 rounded font-semibold text-lg hover:bg-lime-600"
      >
        login
      </Button>
    </form>
  );
}