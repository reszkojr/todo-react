import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '~/components/Button';
import Checkbox from '~/components/Checkbox';
import FloatingTextInput from '~/components/FloatingTextInput';
import { register as registerUser } from '~/services/auth.service';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export default function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            await registerUser({
                email: data.email,
                password: data.password,
                username: data.username,
            });
            toast.success(
                <div>
                    Registered successfully!
                    <br />
                    Now, log in using the same email and password you registered with
                </div>
            );
            navigate('/auth/login');
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data);
            }
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-md p-8 space-y-3 bg-gray-800 rounded-lg'>
                <div className='flex flex-col gap-2 mb-6'>
                    <h1 className='text-3xl font-bold text-white'>Register</h1>
                    <h2 className='text-white opacity-75'>
                        Already have an account?{' '}
                        <Link to='/auth/login' className='text-teal-400 hover:underline'>
                            Log in here
                        </Link>
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <FloatingTextInput label='Username' name='username' type='text' register={register} requiredMessage='Username is required' errorMessage={errors.username?.message as string} />
                    <FloatingTextInput label='Email' name='email' type='email' register={register} requiredMessage='Email is required' errorMessage={errors.email?.message as string} />
                    <FloatingTextInput label='Password' name='password' type={showPassword ? 'text' : 'password'} register={register} requiredMessage='Password is required' errorMessage={errors.password?.message as string} className='mb-3' />
                    <Checkbox label='Show password' register={register} checked={showPassword} onChange={setShowPassword} />
                    <div className='flex items-center justify-end'>
                        <Button type='submit' label='Register' className='w-2/5' />
                    </div>
                </form>
            </div>
        </div>
    );
}