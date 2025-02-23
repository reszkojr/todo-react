import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '~/components/Button';
import Checkbox from '~/components/Checkbox';
import FloatingTextInput from '~/components/FloatingTextInput';
import { toast } from 'react-toastify';
import { login as loginUser } from '~/services/auth.service';

export default function Login() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = async (data: any) => {
		try {
			await loginUser({
				email: data.email,
				password: data.password,
			});
			toast.success('Login realizado com sucesso!');
			// navigate('/todos');
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='w-full max-w-md p-8 space-y-3 bg-gray-800 rounded-md'>
				<div className='flex flex-col gap-4 mb-4'>
					<h1 className='text-3xl font-bold text-white'>Login</h1>
					<h2 className='text-white'>
						Ainda não tem uma conta?{' '}
						<Link to='/auth/register' className='text-teal-400 hover:underline'>
							Cadastre-se aqui
						</Link>
					</h2>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<FloatingTextInput label='Email' name='email' type='email' register={register} requiredMessage='Email é obrigatório' errorMessage={errors.email?.message as string} />
					<FloatingTextInput label='Senha' name='password' type={showPassword ? 'text' : 'password'} register={register} requiredMessage='Senha é obrigatória' errorMessage={errors.password?.message as string} className='mb-3' />
					<Checkbox label='Mostrar senha' register={register} checked={showPassword} onChange={setShowPassword} />
					<div className='flex items-center justify-end'>
						<Button type='submit' label='Login' onClick={() => console.log('Button clicked')} className='w-2/5' />
					</div>
				</form>
			</div>
		</div>
	);
}
