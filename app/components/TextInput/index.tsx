import React from 'react';

export interface TextInputProps {
	label: string;
	type: string;
	name: string;
	register: any;
	requiredMessage: string;
	errorMessage?: string;
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	errorClassName?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, type, name, register, requiredMessage, errorMessage, className = '', labelClassName = '', inputClassName = '', errorClassName = '' }) => {
	return (
		<div className={className}>
			<label className={`block text-sm font-medium text-slate-300 ${labelClassName}`}>{label}</label>
			<input type={type} {...register(name, { required: requiredMessage })} className={`w-full px-3 py-2 mt-1 border rounded-sm shadow-sm bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring focus:ring-teal-500 ${inputClassName}`} />
			{errorMessage && <p className={`text-red-500 text-sm mt-1 ${errorClassName}`}>{errorMessage}</p>}
		</div>
	);
};

export default TextInput;
