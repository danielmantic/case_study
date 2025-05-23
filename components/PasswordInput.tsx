'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface PasswordInputProps {
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  handler,
  value,
  id = 'passwordInput',
  placeholder = '',
  name,
  disabled = false,
  className,
}) => {
  const [type, setType] = useState<'password' | 'text'>('password');

  const toggleVisibility = () => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
  <div className="relative grid grid-cols-[100%] self-stretch">
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handler}
      disabled={disabled}
      className={clsx(
        'flex h-[2.9em] items-center outline-none border pl-[15px] pr-3 py-1 rounded-full border-solid transition-colors duration-200',
        value ? 'bg-orange-100 border-[#ff4100]' : 'bg-white border-black',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    />
    <button
      type="button"
      onClick={toggleVisibility}
      className="absolute right-[10px] top-[12px] text-sm text-[#ff4100] font-semibold bg-transparent
      border-none outline-none focus:outline-none focus:ring-0 hover:no-underline cursor-pointer"
      tabIndex={-1}
    >
      {type === 'password' ? 'Show' : 'Hide'}
    </button>
  </div>
);
};

export default PasswordInput;
