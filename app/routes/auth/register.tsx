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
					Registrado com sucesso!
					<br />
					Agora, realize o login utilizando o mesmo email e senha que cadastrou
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
			<div className='w-full max-w-md p-8 space-y-3 bg-gray-800 rounded-md'>
				<div className='flex flex-col gap-4 mb-4'>
					<h1 className='text-3xl font-bold text-white'>Register</h1>
					<h2 className='text-white'>
						Já tem uma conta?{' '}
						<Link to='/auth/login' className='text-teal-400 hover:underline'>
							Faça login aqui
						</Link>
					</h2>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<FloatingTextInput label='Nome de usuário' name='username' type='text' register={register} requiredMessage='Nome de usuário é obrigatório' errorMessage={errors.username?.message as string} />
					<FloatingTextInput label='Email' name='email' type='email' register={register} requiredMessage='Email é obrigatório' errorMessage={errors.email?.message as string} />
					<FloatingTextInput label='Senha' name='password' type={showPassword ? 'text' : 'password'} register={register} requiredMessage='Senha é obrigatória' errorMessage={errors.password?.message as string} className='mb-3' />
					<Checkbox label='Mostrar senha' register={register} checked={showPassword} onChange={setShowPassword} />
					<div className='flex items-center justify-end'>
						<Button type='submit' label='Register' className='w-2/5' />
					</div>
				</form>
			</div>
		</div>
	);
}
