import React, { forwardRef } from 'react';
import { Input } from '@headlessui/react';

interface TextProps {
  id?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelColor?: string;
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Text = forwardRef<HTMLInputElement, TextProps>(({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  required = false,
  disabled = false,
  className = '',
  labelColor = 'white',
  label,
  error,
  size = 'md',
  onChange,
  onBlur,
  onFocus,
}, ref) => {
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-4 text-base',
    lg: 'py-3.5 px-5 text-lg'
  };

  const inputClasses = `
    w-full text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
    ${error ? 'border-red-400/50' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${sizeClasses[size]}
    ${className}
  `.trim();
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={id || name} 
          className={`block text-${labelColor} text-sm font-semibold mb-2 flex justify-start`}
        >
          {label}
          {required && <span className="text-red-300 ml-1">*</span>}
        </label>
      )}
      <Input
        ref={ref}
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        className={inputClasses}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {error && (
        <p className="text-red-300 text-sm mt-1 justify-self-start">{error}</p>
      )}
    </div>
  );
});

Text.displayName = 'Text';

export default Text; 