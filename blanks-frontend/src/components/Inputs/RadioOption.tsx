import React from 'react';
import SecondaryText from '../reusables/SecondaryText';

interface RadioOptionProps {
	label: string;
	price: number;
	name: string;
	value: number;
	checked?: boolean;
	onChange?: (value: any) => void;
	shippingOptions?:any
}

const RadioOption: React.FC<RadioOptionProps> = ({
	label,
	price,
	name,
	value,
	checked,
	onChange,
	shippingOptions
}) => {
	return (
		<label className='flex items-center justify-between w-full py-2 cursor-pointer'>
			<div className='flex items-center space-x-2'>
				<input
					type='radio'
					name={name}
					value={value}
					checked={checked}
					onChange={() => onChange?.(shippingOptions)}
					className='w-[12px] h-[12px]'
				/>
				<SecondaryText className=''>{label}</SecondaryText>
			</div>
			<SecondaryText className='font-semibold'>${price}</SecondaryText>
		</label>
	);
};

export default RadioOption;
