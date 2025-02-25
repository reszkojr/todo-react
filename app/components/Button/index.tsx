import React from 'react';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    label: string;
    onClick?: () => void;
    className?: string;
    startIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, label, onClick, className = '', startIcon: StartIcon }) => {
    return (
        <button type={type} onClick={onClick} className={`px-4 py-2 font-bold text-white items-center bg-teal-600 flex gap-2 rounded-md shadow-[inset_0_2px_1px_rgba(255,255,255,0.3),0_1px_5px_rgba(0,0,0,0.3)] hover:brightness-90 cursor-pointer transition-all duration-125 focus:outline-none focus:border-2 focus:border-teal-400 ${className}`}>
            {StartIcon && StartIcon}
            {label}
        </button>
    );
};

export default Button;
