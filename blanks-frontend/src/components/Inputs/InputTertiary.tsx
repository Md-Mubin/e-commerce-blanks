import React from 'react';
import SecondaryText from '../reusables/SecondaryText';
import { PrimaryText } from '../reusables';

type InputFieldProps = {
	label: string;
	name: string;
	type?: string;
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	error?: string;
	required?: boolean;
	options?: string[]; // for dropdown
	onBlur: (e: any) => void;
};

const TertiaryInputField: React.FC<InputFieldProps> = ({
	label,
	name,
	type = 'text',
	value,
	onChange,
	error,
	required,
	options,
	onBlur,
}) => {
	return (
		<div className='grid grid-cols-[0.5fr_1fr] items-center mb-6  gap-2 w-full'>
			<label className='flex justify-between items-center'>
				<PrimaryText className='inline-block font-normal mb-1'>
					{label}
				</PrimaryText>
				{required && (
					<span className='text-secondaryColor uppercase text-[12px]'>
						required
					</span>
				)}
			</label>
			{options ? (
				<div className='justify-self-end w-full relative'>
					<select
						name={name}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						className={`w-full border px-2 py-2 outline-none focus:border-black ${
							error ? 'border-red400' : 'border-secondaryBorder'
						}`}
					>
						<option value=''>Choose a {label}</option>
						{options?.map(opt => (
							<option key={opt} value={opt}>
								{opt}
							</option>
						))}
					</select>
					{error && (
						<SecondaryText className='absolute top-[34px] left-0 text-red400 mt-1 tracking-wide'>
							{error}
						</SecondaryText>
					)}
				</div>
			) : (
				<div className='w-full justify-self-end relative'>
					<input
						name={name}
						type={type}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						className={`w-full border px-2 py-1 outline-none focus:border-black ${
							error ? 'border-red400' : 'border-secondaryBorder'
						}`}
					/>
					{error && (
						<SecondaryText className='absolute top-[32px] left-0  text-red400 mt-1 tracking-wide'>
							{error}
						</SecondaryText>
					)}
				</div>
			)}
		</div>
	);
};

export default TertiaryInputField;
