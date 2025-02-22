import React from 'react';

interface FloatingTextInputProps {
	label: string;
	type: string;
	register: any;
	requiredMessage: string;
	errorMessage?: string;
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	errorClassName?: string;
}

const FloatingTextInput: React.FC<FloatingTextInputProps> = ({ label, type, register, requiredMessage, errorMessage, className = '', labelClassName = '', inputClassName = '', errorClassName = '' }) => {
	return (
		<div className={`relative mb-4 ${className}`}>
			<input type={type} {...register(label.toLowerCase(), { required: requiredMessage })} className={`block px-2.5 pb-2.5 pt-5 w-full rounded-sm text-sm bg-gray-700 border-1 appearance-none text-white border-gray-600 focus:outline-none focus:ring-0 focus:border-teal-600 peer ${inputClassName}`} placeholder=' ' />
			<label htmlFor={label.toLowerCase()} className={`absolute text-sm duration-200 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5  peer-focus:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${labelClassName}`}>
				{label}
			</label>
			{errorMessage && <p className={`text-red-500 text-sm mt-1 ${errorClassName}`}>{errorMessage}</p>}
		</div>
	);
};

export default FloatingTextInput;
