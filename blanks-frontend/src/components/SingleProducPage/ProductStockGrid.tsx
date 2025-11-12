'use client';

import { useState } from 'react';
import { PrimaryText } from '../reusables';
import SecondaryText from '../reusables/SecondaryText';

type DataProps = {
	data: any; // Replace with real type if available
};

export default function ProductStockGrid({ data }: DataProps) {
	const [selectedQuantity, setSelectedQuantity] = useState(0);
	const [selectedColor, setSelectedColor] = useState(data?.colors[0]);

	const handleStockChange = (
		warehouseId: string,
		size: string,
		value: number
	) => {
		const newColor = {
			...selectedColor,
			stock: {
				...selectedColor.stock,
				[warehouseId]: {
					...selectedColor.stock[warehouseId],
					[size]: value,
				},
			},
		};
		setSelectedQuantity(value);
		setSelectedColor(newColor);
	};

	return (
		<div className='space-y-8'>
			{/* Color Selector */}
			{/* <div>
				<p className='font-semibold mb-2'>Color:</p>
				<div className='flex flex-wrap gap-2'>
					{data.colors.map((color: any) => (
						<button
							key={color.name}
							onClick={() => setSelectedColor(color)}
							className={`w-8 h-8 rounded border-2 ${
								selectedColor.name === color.name
									? 'border-black'
									: 'border-gray-300'
							}`}
							style={{ backgroundColor: color.hex }}
							title={color.name}
						/>
					))}
				</div>
			</div> */}

			{/* Grid */}
			<div className='overflow-x-auto'>
				{/* sizes column */}
				<div
					className={`grid gap-x-2 gap-y-4`}
					style={{
						gridTemplateColumns: `180px repeat(${data.availableSizes.length}, 80px)`,
					}}
				>
					{/* Header Row */}
					<div className='font-semibold text-sm w-full'></div>
					{data?.availableSizes?.map((size: string) => (
						<div key={size} className=''>
							<div className='text-center text-sm font-semibold border border-secondaryBorder py-1 rounded-sm'>
								{size}
							</div>
							<div className='text-primaryColor text-xs text-center mt-1'>
								${data.priceBySize[size]}
							</div>
						</div>
					))}
				</div>

				{/* warehouse and sizes */}
				<div
					className={`grid gap-x-2 gap-y-4`}
					style={{
						gridTemplateColumns: `180px repeat(${data.availableSizes.length}, 80px)`,
					}}
				>
					{/* Warehouse Rows */}
					{data?.warehouses?.map((warehouse: any) => (
						<>
							<div
								key={warehouse.id}
								className='font-medium text-sm py-2 flex flex-col justify-center'
							>
								<PrimaryText>{warehouse.label}</PrimaryText>
								<SecondaryText>Warehouse</SecondaryText>
							</div>
							{data.availableSizes.map((size: string) => (
								// here we should find the gap
								<div key={`${warehouse.id}-${size}`} className='py-1'>
									<input
										type='number'
										className='w-full px-2 py-1 border border-secondaryBorder rounded text-sm'
										value={selectedQuantity || 0}
										onChange={e =>
											handleStockChange(
												warehouse.id,
												size,
												parseInt(e.target.value) || 0
											)
										}
									/>
									<SecondaryText className='text-center text-[12px]'>
										{selectedColor.stock[warehouse.id]?.[size] === 0
											? 'Out Stock'
											: selectedColor.stock[warehouse.id]?.[size]}
									</SecondaryText>
								</div>
							))}
						</>
					))}
				</div>
			</div>
		</div>
	);
}
