import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai'

interface FileInputProps {
    onFileSelect: (file: File) => void;
    label?: string
}

export default function FileInput({ onFileSelect, label }: FileInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileResult, setFileResult] = useState<File>();
    const [previewResult, setPreviewResult] = useState<string>()

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                const result = e.target?.result as string;
                if (result) {
                    onFileSelect(file);
                    setFileResult(file)
                    setPreviewResult(result);
                }
            });
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center gap-2'>
            <div className='text-center text-semibold'>{label}</div>
            <input
                type="file"
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div className="relative inline-block" onClick={handleClick}>
                <input type="file" className="hidden" />
                <label className="flex justify-center items-center border-2 border-dashed border-gray-400 rounded-full text-center leading-40 text-lg cursor-pointer group hover:border-gray-600">
                    {fileResult ? (
                        <div>
                            <Image src={previewResult as string} alt='' width={50} height={50} className="rounded-full h-[50px] object-cover" />
                        </div>
                    ) : (

                        <AiOutlineUserAdd size={50} className='text-gray-400 group-hover:text-gray-600 p-2' />
                    )}
                </label>
            </div>
            <div className='text-gray-400 text-sm'>{fileResult?.name}</div>
        </div>
    );
};
