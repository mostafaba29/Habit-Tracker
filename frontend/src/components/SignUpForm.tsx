import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { Button } from '@/components/ui/button';
import { userSignUp } from '@/utils/api';

const signupSchema = z.object({
    phone: z.string().min(10, "Mobile number should be 10 digits").max(11, "Mobile number should be 10 digits"),
    password: z.string().min(1, "Password is required"),
    name: z.string().min(10, "Name is required"),
})

type signupformData = z.infer<typeof signupSchema >;
export default function SignupForm() {
  
  const queryClinet = useQueryClient();
  const {register,handleSubmit,formState:{errors}} = useForm<signupformData>({
      resolver: zodResolver(signupSchema)
  })

  const {mutateAsync,isLoading,isError, error} = useMutation({
    mutationFn: userSignUp,
    onSuccess: () => {
      window.location.href='/'
    },
    onError:(error) => {
      console.error('Signup failed',error);
    }
  })
  const onSubmit = async(data: signupformData) => {
    try {
      await mutateAsync({
        name: data.name,
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
      <label className='text-lg text-white '>Name</label>
      <input
        {...register('name')}
        type='text'
        placeholder='type your name here ...'
        className='w-full p-2 bg-zinc-700 text-white rounded shadow-md'
      />
      {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
      <label className='text-lg text-white '>Mobile number</label>
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
        className="w-full bg-lime-500 text-white p-2 rounded hover:bg-lime-600"
        disabled={isLoading}
      >
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );

}