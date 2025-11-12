import React from 'react';
import PrimaryText from '../reusables/PrimaryText';
import SecondaryText from '../reusables/SecondaryText';
import { InputField } from '../reusables';

interface WarehouseCardProps {
	warehouse: any;
	availableSizes: string[];
	priceBySize: { [key: string]: number };
	stock: { [size: string]: number };
	selectedQuantity: { [key: string]: number | '' };
	onChange: (size: string, value: string) => void;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({
	warehouse,
	availableSizes,
	priceBySize,
	stock,
	selectedQuantity,
	onChange,
}) => {
	return (
		<div className='bg-gray-100 rounded-lg p-4 shadow-sm'>
			{/* Warehouse title */}
			<div className='font-medium text-sm py-2 flex flex-col justify-center'>
				<PrimaryText>{warehouse.label}</PrimaryText>
				<SecondaryText>Warehouse</SecondaryText>
			</div>

			{/* Size grid */}
			<div className='grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-3'>
				{availableSizes.map(size => {
					const isOutOfStock = stock[size] === 0;
					return (
						<div key={size} className='flex flex-col items-center'>
							{/* Size + Price */}
							<div className='text-center'>
								<div className='font-semibold'>{size}</div>
								<div className='text-xs text-blue-500 font-medium'>
									${priceBySize[size]}
								</div>
							</div>

							{/* InputField instead of Chakra Input */}
							<InputField
								name={`qty-${size}`}
								type='number'
								value={selectedQuantity[size]?.toString() ?? ''}
								onChange={e => onChange(size, e.target.value)}
								className={`no-arrows text-center mt-1 ${
									isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''
								}`}
								placeholder='0'
								required={false}
							/>

							{/* Stock */}
							<div
								className={`text-xs font-semibold mt-1 ${
									isOutOfStock ? 'text-red-500' : 'text-gray-700'
								}`}
							>
								{isOutOfStock ? 'Out' : stock[size]}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default WarehouseCard;