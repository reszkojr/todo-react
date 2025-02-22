import React from 'react';

interface CheckboxProps {
	label: string;
	checked: boolean;
	register: any;
	requiredMessage?: string;
	onChange: (checked: boolean) => void;
	className?: string;
	labelClassName?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, register, requiredMessage, onChange, className = '', labelClassName = '' }) => {
	return (
		<div className={`flex items-center ${className}`}>
			<input type='checkbox' checked={checked} {...register(label.toLowerCase(), { required: requiredMessage })} onChange={(e) => onChange(e.target.checked)} className='w-4 h-4 rounded-[3px] focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600' />
			<label className={`ml-2 text-sm text-slate-300 ${labelClassName}`}>{label}</label>
		</div>
	);
};

export default Checkbox;
