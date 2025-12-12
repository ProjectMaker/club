'use client';

import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    description?: string;
}

export interface SelectProps {
    id?: string;
    name?: string;
    value: string;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    onChange: (value: string) => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'modern' | 'minimal';
    error?: string;
}

const Select: React.FC<SelectProps> = ({
    id,
    name,
    value,
    options,
    placeholder = "Sélectionner une option",
    required = false,
    disabled = false,
    label,
    onChange,
    className = '',
    size = 'md',
    variant = 'modern',
    error
}) => {
    const selectedOption = options.find(option => option.value === value) || null;

    const sizeClasses = {
        sm: 'py-1.5 pl-3 pr-8 text-sm',
        md: 'py-2.5 pl-4 pr-10 text-base',
        lg: 'py-3.5 pl-5 pr-12 text-lg'
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    const getVariantClasses = () => {
        const baseClasses = 'relative w-full cursor-default rounded-xl text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 transition-all duration-200';
        
        switch (variant) {
            case 'modern':
                return `${baseClasses} bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-indigo-300 ${error ? 'border-red-400 ring-red-300' : ''}`;
            case 'minimal':
                return `${baseClasses} bg-white border border-gray-300 hover:border-gray-400 ${error ? 'border-red-400' : ''}`;
            default:
                return `${baseClasses} bg-white border border-gray-300 shadow-sm hover:border-indigo-400 ${error ? 'border-red-400' : ''}`;
        }
    };

    const getButtonClasses = () => {
        return `${getVariantClasses()} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''} ${className}`;
    };

    return (
        <div className="w-full">
            {label && (
                <label 
                    htmlFor={id || name}
                    className="block text-sm font-semibold text-white mb-2"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            <div className="relative">
                <Listbox value={value} onChange={onChange} disabled={disabled}>
                    <div className="relative">
                        <Listbox.Button className={getButtonClasses()}>
                            <span className="flex items-center">
                                {selectedOption?.icon && (
                                    <span className={`mr-3 flex-shrink-0 ${iconSizes[size]}`}>
                                        {selectedOption.icon}
                                    </span>
                                )}
                                <span className={`block truncate ${!selectedOption ? 'text-gray-500' : 'text-gray-900'} font-medium`}>
                                    {selectedOption ? selectedOption.label : placeholder}
                                </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ChevronDownIcon
                                    className={`${iconSizes[size]} text-gray-400 transition-transform duration-200 ui-open:rotate-180`}
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 z-10">
                                {options.map((option) => (
                                    <Listbox.Option
                                        key={option.value}
                                        className={({ active, selected }) =>
                                            `relative cursor-default select-none py-3 pl-4 pr-10 transition-colors duration-150 ${
                                                active 
                                                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-900' 
                                                    : 'text-gray-900'
                                            } ${
                                                selected ? 'bg-indigo-100 text-indigo-900 font-semibold' : ''
                                            } ${
                                                option.disabled ? 'opacity-50 cursor-not-allowed' : ''
                                            }`
                                        }
                                        value={option.value}
                                        disabled={option.disabled}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    {option.icon && (
                                                        <span className={`mr-3 flex-shrink-0 ${iconSizes[size]}`}>
                                                            {option.icon}
                                                        </span>
                                                    )}
                                                    <div className="flex-1">
                                                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-medium'}`}>
                                                            {option.label}
                                                        </span>
                                                        {option.description && (
                                                            <span className="block text-sm text-gray-500 mt-0.5">
                                                                {option.description}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {selected && (
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                        <CheckIcon className={`${iconSizes[size]} text-indigo-600`} aria-hidden="true" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>

            {error && (
                <div className="mt-2 flex items-start">
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
            )}
        </div>
    );
};

export default Select; 