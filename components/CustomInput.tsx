'use client';

import React from 'react';
import clsx from 'clsx';

interface CustomInputProps {
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id?: string;
  placeholder?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  handler,
  value,
  id = 'customInput',
  placeholder = '',
  name,
  type = 'text',
  disabled = false,
  className,
}) => {
  return (
    <div className="grid grid-cols-[100%] self-stretch">
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
    </div>
  );
};

export default CustomInput;
