'use client';

import { useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

import type { SelectOption } from './Select';

// Ignore les accents et la casse : « rhone » trouve « Rhône »
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

interface SearchSelectProps {
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    placeholder?: string;
    ariaLabel?: string;
    className?: string;
}

// Liste déroulante avec recherche, pour les listes longues (ex. départements)
export default function SearchSelect({ value, options, onChange, placeholder, ariaLabel, className = '' }: SearchSelectProps) {
    const [query, setQuery] = useState('')
    const filtered = query ? options.filter(option => normalize(option.label).includes(normalize(query))) : options

    return (
        <Combobox immediate value={value || null} onChange={(selected: string | null) => onChange(selected ?? '')} onClose={() => setQuery('')}>
            <div className="relative">
                <ComboboxInput
                    aria-label={ariaLabel}
                    placeholder={placeholder}
                    displayValue={(selected: string | null) => options.find(option => option.value === selected)?.label || ''}
                    onChange={event => setQuery(event.target.value)}
                    className={`w-full bg-white text-gray-900 font-medium rounded-lg border border-gray-300 py-2.5 pl-3 pr-9 text-sm placeholder:text-gray-500 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent ${className}`}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" aria-label="Afficher la liste">
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[open]:rotate-180" aria-hidden="true" />
                </ComboboxButton>
                {/* modal={false} : par défaut Headless UI bloque le défilement de la page tant que la liste est ouverte */}
                <ComboboxOptions modal={false} className="absolute z-10 mt-2 max-h-60 min-w-full w-max max-w-[18rem] overflow-auto rounded-xl bg-white py-1 shadow-2xl ring-1 ring-black/5 border border-gray-200 focus:outline-none empty:invisible">
                    {filtered.length === 0 ? (
                        <div className="py-2.5 px-4 text-sm text-gray-500">Aucun résultat</div>
                    ) : filtered.map(option => (
                        <ComboboxOption
                            key={option.value}
                            value={option.value}
                            className="group relative cursor-pointer select-none py-2.5 pl-4 pr-10 text-sm text-gray-900 data-[focus]:bg-gradient-to-r data-[focus]:from-indigo-50 data-[focus]:to-purple-50 data-[focus]:text-indigo-900 data-[selected]:bg-indigo-100 data-[selected]:font-semibold data-[selected]:text-indigo-900"
                        >
                            <span className="block truncate">{option.label}</span>
                            <span className="absolute inset-y-0 right-0 hidden items-center pr-4 group-data-[selected]:flex">
                                <CheckIcon className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                            </span>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </div>
        </Combobox>
    )
}
