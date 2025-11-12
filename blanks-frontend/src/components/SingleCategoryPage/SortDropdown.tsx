'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SortDropdownProps {
	value: any;
	options: any[];
	onChange: any;
	label?: string;
	className?: any;
}

const SortDropdown = ({
	label,
	value,
	options,
	onChange,
	className = '',
}: SortDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={`w-full relative ${className}`}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='w-full md:w-auto flex justify-between md:justify-start items-center gap-2 px-3 py-2 bg-white border border-secondaryBorder rounded text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1'
			>
				<span className='text-primaryColor'>{label}</span>
				<div className='flex items-center gap-1'>
					<span className='font-medium text-primaryColor'>{value}</span>
					<ChevronDown className='w-4 h-4 text-primaryColor' />
				</div>
			</button>

			{isOpen && (
				<div className='absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-full'>
					{options.map(option => (
						<button
							key={option}
							onClick={() => {
								onChange(option);
								setIsOpen(false);
							}}
							className='block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t last:rounded-b'
						>
							{option}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default SortDropdown;
