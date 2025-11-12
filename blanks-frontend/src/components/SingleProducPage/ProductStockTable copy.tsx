'use client';
import React, { useRef, useState } from 'react';
import { PrimaryText } from '../reusables';
import SecondaryText from '../reusables/SecondaryText';

const ProductStockTable = ({ data }: any) => {
	const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

	const [selectedQuantity, setSelectedQuantity] = useState<{
		[key: string]: number | '';
	}>(
		data.warehouses.reduce((acc: any, warehouse: any) => {
			data.availableSizes.forEach((size: any) => {
				acc[`${warehouse.id}-${size}`] = '';
			});
			return acc;
		}, {} as { [key: string]: number | '' })
	);

	const [selectedColor, setSelectedColor] = useState<any>(data?.colors[0]);

	const handleInputChange = (
		warehouseId: string,
		size: string,
		value: string // Accept string to handle empty input
	) => {
		// Allow empty string or convert to number
		const newValue = value === '' ? '' : Math.max(0, parseInt(value) || 0);
		// Update selectedQuantity state
		setSelectedQuantity(prev => ({
			...prev,
			[`${warehouseId}-${size}`]: newValue,
		}));
	};

	// Placeholder for submitting changes to the backend
	const handleSubmit = async () => {};
	// input focus
	// Handle input focus when clicking the table cell
	const handleInputFocus = (warehouseId: string, size: string) => {
		const inputKey = `${warehouseId}-${size}`;
		const inputElement = inputRefs.current[inputKey];
		const isOutOfStock = selectedColor?.stock?.warehouseId[size] === 0;
		if (inputElement && !isOutOfStock) {
			inputElement.focus();
			// Optionally select the text in the input for easier editing
			inputElement.select();
		}
	};

	return (
		<div>
			<div className='overflow-x-auto'>
				<table className='w-full text-sm text-left'>
					<thead className='text-xs text-primaryColor uppercase bg-black border-l border-black'>
						<tr>
							<th scope='col' className='w-[240px] px-6 py-3'></th>
							{data?.availableSizes?.map((size: string) => (
								<th
									scope='col'
									key={size}
									className='px-6 py-2 border border-secondaryBorder last:border-r-black'
								>
									<div className='text-white text-center text-sm font-semibold py-1 rounded-sm'>
										{size}
									</div>
									<div className='text-white text-xs text-center mt-1'>
										${data.priceBySize[size]}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data?.warehouses?.map((warehouse: any) => (
							<tr key={warehouse.id} className='bg-white'>
								<th
									scope='row'
									className='px-6 py-2 border border-secondaryBorder font-medium text-gray-900 whitespace-nowrap'
								>
									<div className='font-medium text-sm py-2 flex flex-col justify-center'>
										<PrimaryText>{warehouse.label}</PrimaryText>
										<SecondaryText>Warehouse</SecondaryText>
									</div>
								</th>

								{data?.availableSizes.map((size: string) => {
									const isOutOfStock =
										selectedColor?.stock?.[warehouse.id]?.[size] === 0;
									return (
										<td
											onClick={() => handleInputFocus(warehouse.id, size)}
											key={`${warehouse.id}-${size}`}
											className={`border border-secondaryBorder px-2 ${
												selectedColor.stock[warehouse.id]?.[size] === 0
													? 'cursor-not-allowed'
													: ''
											}`}
										>
											<input
												ref={el => {
													inputRefs.current[`${warehouse.id}-${size}`] = el;
												}}
												name={`size-${size}`}
												type='number'
												className={`no-arrows w-full lg:max-w-[110px] px-2 py-1 text-sm border border-secondaryBorder ${
													isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''
												}`}
												value={selectedQuantity[`${warehouse.id}-${size}`]}
												onChange={e => {
													handleInputChange(warehouse.id, size, e.target.value);
												}}
												disabled={isOutOfStock}
											/>
											<SecondaryText
												className={`text-center text-[12px] font-bold mt-1 ${
													selectedColor.stock[warehouse.id]?.[size] === 0
														? 'text-red400'
														: ''
												}`}
											>
												{selectedColor.stock[warehouse.id]?.[size] === 0
													? 'Out Stock'
													: selectedColor.stock[warehouse.id]?.[size]}
											</SecondaryText>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductStockTable;
