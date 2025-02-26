import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '~/components/Button';
import Checkbox from '~/components/Checkbox';
import FloatingTextInput from '~/components/FloatingTextInput';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { useAuth } from '~/contexts/auth/auth.context';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            await login(data.email, data.password);
            toast.success('Login successful!');
            navigate('/todos/view/columns');
        } catch (error) {
            if (isAxiosError(error)) {
                return toast.error(error.request?.response);
            }
            toast.error('An unknown error occurred while logging you in.');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-md p-8 space-y-3 bg-gray-800 rounded-lg'>
                <div className='flex flex-col gap-2 mb-6'>
                    <h1 className='text-3xl font-bold text-white'>Login</h1>
                    <h2 className='text-white'>
                        Don't have an account yet?{' '}
                        <Link to='/auth/register' className='text-teal-400 hover:underline'>
                            Register here
                        </Link>
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <FloatingTextInput label='Email' name='email' type='email' register={register} requiredMessage='Email is required' errorMessage={errors.email?.message as string} />
                    <FloatingTextInput label='Password' name='password' type={showPassword ? 'text' : 'password'} register={register} requiredMessage='Password is required' errorMessage={errors.password?.message as string} className='mb-3' />
                    <Checkbox label='Show password' register={register} checked={showPassword} onChange={setShowPassword} />
                    <div className='flex items-center justify-end'>
                        <Button type='submit' label='Login' className='w-1/3' />
                    </div>
                </form>
            </div>
        </div>
    );
}