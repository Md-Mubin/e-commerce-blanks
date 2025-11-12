'use client';
import React, { useState } from 'react';
import { Flex } from '../reusables';

const SizeSelection = () => {
	const [selectedSize, setSelectedSize] = useState('M');
	const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

	return (
		<div className='space-y-3'>
			<div className='flex items-center'>
				<span className='font-semibold'>SIZE:</span>
				<span className='text-gray-400 text-sm ml-2'>REQUIRED</span>
			</div>
			<div className='grid grid-cols-12 gap-2'>
				<div className='col-span-3'>Color Dropdown</div>
				{sizes?.map((size, index) => (
					<Flex className='flex-col gap-1' key={size}>
						<button
							onClick={() => setSelectedSize(size)}
							className={`px-4 py-2 border rounded col-span-1 ${
								selectedSize === size
									? 'border-blue-500 bg-blue-50 text-blue-700'
									: 'border-gray-300 hover:border-gray-400'
							}`}
						>
							{size}
						</button>
						<p>${12 * (index + 1)}</p>
					</Flex>
				))}
			</div>
			{/* warehose and stock for each product */}
			<div className='grid grid-cols-12 gap-2'>
				<div className='col-span-3'>warehouse name and location</div>
				<div className='col-span-9'>Sizes</div>
			</div>
			{/* Stock Info */}
			<div className='text-sm'>
				<span className='font-semibold'>CURRENT STOCK:</span>
				<span className='ml-2 text-green-600'>27810</span>
			</div>
		</div>
	);
};

export default SizeSelection;
