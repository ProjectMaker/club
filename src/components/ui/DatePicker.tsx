'use client';

import React from 'react';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover
} from 'react-aria-components';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { DateValue } from '@internationalized/date';

interface DatePickerProps {
  label?: string;
  value?: DateValue | null;
  onChange?: (date: DateValue | null) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Sélectionner une date",
  error,
  disabled = false,
  required = false,
  className = '',
  size = 'md'
}: DatePickerProps) {
  const sizeClasses = {
    sm: {
      input: 'py-1.5 px-3 text-sm',
      button: 'p-1.5',
      icon: 'w-4 h-4'
    },
    md: {
      input: 'py-2.5 px-4 text-base',
      button: 'p-2',
      icon: 'w-5 h-5'
    },
    lg: {
      input: 'py-3.5 px-5 text-lg',
      button: 'p-2.5',
      icon: 'w-6 h-6'
    }
  };

  const inputClasses = `
    w-full text-gray-900 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${sizeClasses[size].input}
    ${className}
  `.trim();

  const buttonClasses = `
    flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600
    ${sizeClasses[size].button}
  `.trim();

  return (
    <AriaDatePicker
      value={value}
      onChange={onChange}
      isDisabled={disabled}
      isRequired={required}
      className="w-full"
    >
      {label && (
        <Label className="block text-sm font-semibold text-white mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <Group className="relative">
        <DateInput className={inputClasses}>
          {(segment) => (
            <DateSegment
              segment={segment}
              className={`
                px-1 py-0.5 rounded focus:bg-indigo-400 focus:text-white outline-none
                placeholder-shown:text-gray-400
                ${segment.isPlaceholder ? 'text-gray-400 italic' : 'text-gray-900'}
              `}
            />
          )}
        </DateInput>
        
        <Button className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${buttonClasses}`}>
          <CalendarIcon className={sizeClasses[size].icon} />
        </Button>
      </Group>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}

      <Popover className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 z-50">
        <Dialog className="outline-none">
          <Calendar className="w-full">
            <header className="flex items-center justify-between mb-4">
              <Button 
                slot="previous"
                className="p-2 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </Button>
              
              <Heading className="text-lg font-semibold text-gray-900" />
              
              <Button 
                slot="next"
                className="p-2 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </Button>
            </header>
            
            <CalendarGrid className="w-full border-separate border-spacing-1">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-xs font-medium text-gray-500 pb-2 text-center">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={`
                      w-10 h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer text-gray-900
                      hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500
                      selected:bg-indigo-600 selected:text-white selected:hover:bg-indigo-700
                      outside-month:text-gray-300 outside-month:hover:bg-gray-50
                      unavailable:text-gray-300 unavailable:cursor-not-allowed unavailable:hover:bg-transparent
                      today:font-semibold today:bg-indigo-50 today:text-indigo-600
                    `}
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
} 