import { useState } from 'react';
import { GrSearch } from 'react-icons/gr'

interface Props {
    label?: string
    placeholder?: string
    search?: boolean
    onChange?: (value: string) => void
    type?: string
}

export default function Input({ label, placeholder, search, onChange, type }: Props) {
    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className='w-full'>
            {label && (
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            )}
            <div className="relative mt-2 rounded-md shadow-sm">
                {search && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <GrSearch />
                    </div>
                )}
                <input
                    type={type ?? 'text'}
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 duration-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}