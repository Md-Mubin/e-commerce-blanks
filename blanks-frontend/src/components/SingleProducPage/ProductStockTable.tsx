'use client';
import React, { useRef, useState, useMemo } from 'react';
import { ButtonPrimary, PrimaryText } from '../reusables';
import SecondaryText from '../reusables/SecondaryText';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { showCartModal } from '@/store/slices/uiSlice';

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductStockTable = ({ data }: any) => {
	// console.log('single product data:', data);
	const dispatch = useDispatch();
	const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
	const [validationError, setValidationError] = useState<string>('');

	// Create mapping for sizes → price → stock → discountTiers
	const { availableSizes, priceBySize, stockBySize, discountTiersBySize } = useMemo(() => {
	const sizes: string[] = [];
	const priceMap: Record<string, number> = {};
	const stockMap: Record<string, number> = {};
	const discountTiersMap: Record<string, any[]> = {};

	// 1️⃣ Variations first
	data?.variations?.forEach((variant: any) => {
		const sizeAttr = variant.attributes?.find((attr: any) =>
			attr.label?.toLowerCase().includes('size')
		);
		if (!sizeAttr) return;

		const size = sizeAttr.value.toUpperCase();
		sizes.push(size);
		priceMap[size] = variant.price;
		stockMap[size] = variant.stock;

		discountTiersMap[size] =
			variant.discountTiers && variant.discountTiers.length > 0
				? variant.discountTiers
				: data?.discountTiers || [];
	});

	// 2️⃣ Base product size (customAttributes)
	const baseSizeAttr = data?.customAttributes?.find((attr: any) =>
		attr.label?.toLowerCase().includes('size')
	);
	if (baseSizeAttr) {
		const baseSize = baseSizeAttr.value.toUpperCase();
		// Add only if not already covered by variations
		if (!sizes.includes(baseSize)) {
			sizes.push(baseSize);
			priceMap[baseSize] = data?.price || 0;
			stockMap[baseSize] = data?.stock || 0;
			discountTiersMap[baseSize] = data?.discountTiers || [];
		}
	}

	return {
		availableSizes: sizes,
		priceBySize: priceMap,
		stockBySize: stockMap,
		discountTiersBySize: discountTiersMap,
	};
}, [data]);


	// Quantity state
	const [selectedQuantity, setSelectedQuantity] = useState<
		Record<string, number | ''>
	>(ALL_SIZES.reduce((acc, size) => ({ ...acc, [size]: '' }), {}));

	const handleInputChange = (size: string, value: string) => {
		const newValue = value === '' ? '' : Math.max(0, parseInt(value) || 0);
		setSelectedQuantity(prev => ({
			...prev,
			[size]: newValue,
		}));
		if (validationError) setValidationError('');
	};

	const handleAddToCart = () => {
		const hasSelection = Object.values(selectedQuantity).some(
			qty => typeof qty === 'number' && qty > 0
		);
		if (!hasSelection) {
			setValidationError(
				'Please select at least one quantity before adding to cart.'
			);
			return;
		}

		const itemsToAdd: any[] = [];
		let hasError = false;

		Object.entries(selectedQuantity).forEach(([size, qty]) => {
			if (typeof qty === 'number' && qty > 0) {
				const stock = stockBySize[size] || 0;
				if (qty > stock) {
					setValidationError(
						`Cannot add ${qty} of size ${size} — only ${stock} available.`
					);
					hasError = true;
					return;
				}

				itemsToAdd.push({
					_id: data?._id,
					image: data?.images?.[0] || data?.image,
					productName: data?.name,
					size,
					qty,
					price: priceBySize[size] || data?.price,
					discountTiers: discountTiersBySize[size] || [], // Add discount tiers
				});
			}
		});

		if (hasError) return;

		itemsToAdd.forEach(item => dispatch(addToCart(item)));
		dispatch(showCartModal());

		setSelectedQuantity(
			ALL_SIZES.reduce((acc, size) => ({ ...acc, [size]: '' }), {})
		);
		setValidationError('');
	};

	const handleInputFocus = (size: string) => {
		const el = inputRefs.current[size];
		const stock = stockBySize[size] || 0;
		if (el && stock > 0) {
			el.focus();
			el.select();
		}
	};

	// Helper to check if size exists
	const isSizeAvailable = (size: string) => availableSizes.includes(size);

	return (
		<div className='w-full'>
			{/* Validation Error */}
			{validationError && (
				<div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md'>
					<p className='text-red400 text-sm font-medium'>{validationError}</p>
				</div>
			)}

			{/* Table (same look as yours) */}
			<div className='overflow-x-auto hidden lg:block w-full'>
				<table className='w-full text-sm text-left'>
					<thead className='text-xs text-primaryColor uppercase bg-black border-l border-black'>
						<tr>
							<th className='xl:w-[240px] px-6 py-3'></th>
							{ALL_SIZES.map(size => {
								const available = isSizeAvailable(size);
								return (
									<th
										key={size}
										className={`px-6 py-2 border border-secondaryBorder last:border-r-black ${
											!available ? 'opacity-40' : ''
										}`}
									>
										<div className='text-primaryColor text-center text-sm font-semibold py-1 rounded-sm'>
											{size}
										</div>
										<div className='text-primaryColor text-xs text-center mt-1'>
											{available ? `$${priceBySize[size]}` : 'N/A'}
										</div>
									</th>
								);
							})}
						</tr>
					</thead>

					<tbody>
						<tr className='bg-white'>
							<th className='px-6 py-2 border border-secondaryBorder font-medium text-black whitespace-nowrap'>
								<div className='font-medium text-sm py-2 flex flex-col justify-center'>
									<PrimaryText>Main Stock</PrimaryText>
									<SecondaryText>Product Variations</SecondaryText>
								</div>
							</th>

							{ALL_SIZES.map(size => {
								const stock = stockBySize[size] || 0;
								const available = isSizeAvailable(size);
								const disabled = !available || stock === 0;

								return (
									<td
										key={size}
										onClick={() => !disabled && handleInputFocus(size)}
										className={`border border-secondaryBorder px-2 ${
											disabled && 'cursor-not-allowed'
										}`}
									>
										<input
											ref={el => {
												inputRefs.current[size] = el;
											}}
											type='number'
											className={`no-arrows w-full px-2 py-1 text-sm border-2 border-secondaryBorder outline-0 text-center ${
												disabled ? 'cursor-not-allowed' : 'cursor-pointer'
											}`}
											value={selectedQuantity[size]}
											onChange={e => handleInputChange(size, e.target.value)}
											disabled={disabled}
										/>
										<SecondaryText
											className={`text-center text-[12px] font-bold mt-1 ${
												disabled ? 'text-gray-400' : ''
											}`}
										>
											{!available ? 'N/A' : stock === 0 ? 'Out Stock' : stock}
										</SecondaryText>
									</td>
								);
							})}
						</tr>
					</tbody>
				</table>
			</div>

			{/* Mobile version — same WarehouseCard layout reuse */}
			<div className='lg:hidden grid grid-cols-2 md:grid-cols-3 gap-2'>
				{ALL_SIZES.map(size => {
					const available = isSizeAvailable(size);
					const stock = stockBySize[size] || 0;
					const disabled = !available || stock === 0;
					return (
						<div
							key={size}
							className='border border-secondaryBorder rounded-md bg-white '
						>
							<div className='flex justify-between items-center bg-black p-3'>
								<PrimaryText>{size}</PrimaryText>
								<SecondaryText>
									{available ? `$${priceBySize[size]}` : 'N/A'}
								</SecondaryText>
							</div>
							<div className=' flex justify-between items-center p-3'>
								<input
									type='number'
									className={`text-center border border-secondaryBorder rounded-sm px-2 py-1 w-[100px] ${
										disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
									}`}
									value={selectedQuantity[size]}
									onChange={e => handleInputChange(size, e.target.value)}
									disabled={disabled}
								/>
								<SecondaryText className='text-end'>
									{!available
										? 'N/A'
										: stock === 0
										? 'Out Stock'
										: `${stock} left`}
								</SecondaryText>
							</div>
						</div>
					);
				})}
			</div>

			<ButtonPrimary className='mt-8' onClick={handleAddToCart}>
				Add to cart
			</ButtonPrimary>
		</div>
	);
};

export default ProductStockTable;