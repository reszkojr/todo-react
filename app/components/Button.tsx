import React from 'react';

interface ButtonProps {
	type: 'button' | 'submit' | 'reset';
	label: string;
	onClick?: () => void;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ type, label, onClick, className = '' }) => {
	return (
		<button type={type} onClick={onClick} className={`px-4 py-2 font-bold text-white bg-teal-600 rounded-md shadow-[inset_0_2px_1px_rgba(255,255,255,0.3),0_1px_5px_rgba(0,0,0,0.3)] hover:brightness-90 cursor-pointer transition-all duration-125 focus:outline-none focus:ring focus:ring-indigo-500 ${className}`}>			{label}
		</button>
	);
};

export default Button;
