'use client';
import React, { useRef, useState } from 'react';
import { ButtonPrimary, PrimaryText } from '../reusables';
import SecondaryText from '../reusables/SecondaryText';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import Quantity from './Quantity';

const ProductStockTablev1 = ({ data }: any) => {
	const dispatch = useDispatch();
	const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

	// each product sizes in each warehouse
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
	// color selection
	const [selectedColor, setSelectedColor] = useState<any>(data?.colors[0]);

	const handleInputChange = (
		warehouseId: string,
		size: string,
		value: string
	) => {
		const newValue = value === '' ? '' : Math.max(0, parseInt(value) || 0);
		setSelectedQuantity(prev => ({
			...prev,
			[`${warehouseId}-${size}`]: newValue,
		}));
	};

	// Updated handleSubmit: Dispatch to Redux cart
	const handleAddToCart = () => {
		// Assume data has productName and image; adjust if needed
		// const { productName, image } = data;
		Object.entries(selectedQuantity).forEach(([key, qty]) => {
			if (typeof qty === 'number' && qty > 0) {
				const [warehouseId, size] = key.split('-');
				const warehouse = data.warehouses.find(
					(w: any) => w.id === warehouseId
				);
				if (!warehouse) return; // Safety check

				// Check stock to avoid over-adding (best practice)
				const availableStock = selectedColor?.stock?.[warehouseId]?.[size] || 0;
				if (qty > availableStock) {
					alert(
						`Cannot add ${qty} of size ${size} from ${warehouse.label} - only ${availableStock} available.`
					);
					return;
				}

				// Dispatch addToCart
				dispatch(
					addToCart({
						_id: data?._id,
						image: selectedColor?.imageUrl || data?.image,
						productName: data?.name,
						warehouseName: warehouse.label,
						selectedColor: selectedColor.name || selectedColor, // Adjust if color is object
						size,
						qty: qty,
					})
				);
				// jus loging
				// console.log('added to card', {
				// 	image: selectedColor?.imageUrl,
				// 	productName: data?.name,
				// 	warehouseName: warehouse.label,
				// 	selectedColor: selectedColor.name || selectedColor, // Adjust if color is object
				// 	size,
				// 	quantity: qty,
				// });
			}
		});

		//  Reset selections after add
		setSelectedQuantity(
			data.warehouses.reduce((acc: any, warehouse: any) => {
				data.availableSizes.forEach((size: any) => {
					acc[`${warehouse.id}-${size}`] = '';
				});
				return acc;
			}, {} as { [key: string]: number | '' })
		);

		// alert('Items added to cart!'); // Or use toast notification
	};

	// input focus (unchanged)
	const handleInputFocus = (warehouseId: string, size: string) => {
		const inputKey = `${warehouseId}-${size}`;
		const inputElement = inputRefs.current[inputKey];
		const isOutOfStock = selectedColor?.stock?.[warehouseId]?.[size] === 0;
		if (inputElement && !isOutOfStock) {
			inputElement.focus();
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

			<ButtonPrimary className='mt-8' onClick={handleAddToCart}>
				Add to cart
			</ButtonPrimary>
		</div>
	);
};

export default ProductStockTablev1;
