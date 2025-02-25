import React from 'react';
import type { TextInputProps } from '../TextInput';

const FloatingTextInput: React.FC<TextInputProps> = ({ label, type, name, register, requiredMessage, errorMessage, className = '', labelClassName = '', inputClassName = '', errorClassName = '' }) => {
	return (
		<div className={`relative mb-4 ${className}`}>
			<input type={type} {...register(name, { required: requiredMessage })} className={`block px-2.5 pb-2.5 pt-5 w-full rounded-xl text-sm bg-background-300 backdrop-opacity border-1 appearance-none text-white border-background-200 focus:outline-none focus:ring-0 focus:border-2 focus:border-teal-400 peer ${inputClassName}`} placeholder=' ' />
			<label htmlFor={name} className={`absolute text-sm duration-200 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5  peer-focus:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${labelClassName}`}>
				{label}
			</label>
			{errorMessage && <p className={`text-red-500 text-sm mt-1 ${errorClassName}`}>{errorMessage}</p>}
		</div>
	);
};

export default FloatingTextInput;
