import React from 'react';
import SecondaryText from '../reusables/SecondaryText';
import { PrimaryText } from '../reusables';
import { cn } from '@/lib/utils';

type InputFieldProps = {
	label?: string;
	name: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => void;
	error?: string;
	required?: boolean;
	options?: any[]; // for dropdown
	onBlur?: (e: any) => void;
	placeholder?: string;
	className?: string;
};

const SecondaryInputField: React.FC<InputFieldProps> = ({
	label,
	name,
	type = 'text',
	value,
	onChange,
	error,
	required,
	options,
	onBlur,
	placeholder = '',
	className = '',
}) => {
	return (
		<div className={cn(`flex flex-col w-full mb-4 ${className}`)}>
			<label className='flex justify-between items-center'>
				<PrimaryText className='inline-block font-normal mb-1'>{label}</PrimaryText>
				{required && <span className='text-secondaryColor uppercase text-[12px]'>required</span>}
			</label>
			{options ? (
				<select
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					className={`border rounded px-3 py-2 outline-none focus:border-black ${
						error ? 'border-red400' : 'border-secondaryBorder'
					}`}>
					<option value=''>Select Options</option>
					{options?.map(opt => (
						<option
							key={opt?.label}
							value={opt?.value}>
							{opt?.label}
						</option>
					))}
				</select>
			) : (
				<input
					name={name}
					type={type}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
					className={`border px-3 py-2 outline-none bg-[white] placeholder:text-sm focus:border-black ${
						error ? 'border-red400' : 'border-secondaryBorder'
					}`}
				/>
			)}
			{error && <SecondaryText className='text-red400 mt-1 tracking-wide'>{error}</SecondaryText>}
		</div>
	);
};

export default SecondaryInputField;
