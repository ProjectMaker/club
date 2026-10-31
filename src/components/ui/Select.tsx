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
    // glass : sur fond sombre, comme les barres de filtres de l'admin
    variant?: 'default' | 'modern' | 'minimal' | 'glass';
    error?: string;
    ariaLabel?: string;
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
    error,
    ariaLabel
}) => {
    const selectedOption = options.find(option => option.value === value) || null;
    const isGlass = variant === 'glass';

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
            case 'glass':
                return `${baseClasses} cursor-pointer bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40 data-[open]:border-blue-400 data-[open]:bg-white/15 ${error ? 'border-red-400' : ''}`;
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
                        <Listbox.Button className={getButtonClasses()} aria-label={ariaLabel}>
                            <span className="flex items-center">
                                {selectedOption?.icon && (
                                    <span className={`mr-3 flex-shrink-0 ${iconSizes[size]}`}>
                                        {selectedOption.icon}
                                    </span>
                                )}
                                <span className={`block truncate ${!selectedOption ? (isGlass ? 'text-white/50' : 'text-gray-500') : (isGlass ? 'text-white' : 'text-gray-900')} font-medium`}>
                                    {selectedOption ? selectedOption.label : placeholder}
                                </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ChevronDownIcon
                                    className={`${iconSizes[size]} ${isGlass ? 'text-white/60' : 'text-gray-400'} transition-transform duration-200 ui-open:rotate-180`}
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
                            {/* modal={false} : par défaut Headless UI bloque le défilement de la page tant que la liste est ouverte */}
                            <Listbox.Options modal={false} className={`absolute mt-2 max-h-60 w-full overflow-auto rounded-xl py-1 text-base shadow-2xl focus:outline-none z-10 ${isGlass
                                ? 'min-w-max bg-gradient-to-br from-slate-800/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-lg border border-white/15 shadow-black/40'
                                : 'bg-white ring-1 ring-black ring-opacity-5 border border-gray-200'}`}>
                                {options.map((option) => (
                                    <Listbox.Option
                                        key={option.value}
                                        className={({ active, selected }) =>
                                            isGlass ? `relative cursor-pointer select-none py-2.5 pl-4 pr-10 text-sm transition-colors duration-150 ${
                                                active ? 'bg-white/10 text-white' : 'text-white/80'
                                            } ${
                                                selected ? 'text-white font-semibold' : ''
                                            } ${
                                                option.disabled ? 'opacity-50 cursor-not-allowed' : ''
                                            }` : `relative cursor-default select-none py-3 pl-4 pr-10 transition-colors duration-150 ${
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
                                                            <span className={`block text-sm mt-0.5 ${isGlass ? 'text-white/50' : 'text-gray-500'}`}>
                                                                {option.description}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {selected && (
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                        <CheckIcon className={`${iconSizes[size]} ${isGlass ? 'text-blue-300' : 'text-indigo-600'}`} aria-hidden="true" />
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