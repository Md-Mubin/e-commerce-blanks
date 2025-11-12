'use client';
import { useState } from 'react';
import SecondaryText from '../reusables/SecondaryText';

const ColumnSelector = ({ selectedColumns, onColumnChange }: any) => {
	const columns = [1, 2, 3, 4];

	return (
		<div className='w-full md:w-auto flex items-center justify-between md:justify-start gap-2'>
			<span className='text-sm text-secondaryColor'>Columns:</span>
			<div className='flex gap-1'>
				{columns.map(num => (
					<button
						key={num}
						onClick={() => onColumnChange(num)}
						className={`w-8 h-8 text-sm font-medium rounded-sm border ${
							selectedColumns === num
								? 'text-white border-primaryColor'
								: 'bg-white border-secondaryBorder'
						} focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1`}
					>
						<SecondaryText> {num}</SecondaryText>
					</button>
				))}
				{/* <button
					onClick={() => onColumnChange('grid')}
					className={`w-8 h-8 rounded border flex items-center justify-center ${
						selectedColumns === 'grid'
							? 'bg-blue-600 text-white border-blue-600'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
					} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
				>
					<Grid className='w-4 h-4' />
				</button> */}
			</div>
		</div>
	);
};

export default ColumnSelector;
