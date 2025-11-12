'use client';
import React from 'react';
import { PrimaryText } from '../reusables';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const EmptyCart = () => {
	return (
		<div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
			<div className='mb-4 p-4 rounded-full bg-gray-100'>
				<ShoppingCart size={48} className='text-gray-400' />
			</div>

			<PrimaryText className='text-lg font-medium mb-2 text-gray-700'>
				Your cart is empty
			</PrimaryText>

			<PrimaryText className='text-sm text-gray-500 mb-6 max-w-sm'>
				{`Looks like you haven't added any items to your cart yet. Start shopping to fill it up!`}
			</PrimaryText>

			<Link
				href='/'
				className='px-6 py-3 border-[black] bg-[black] text-white text-sm font-medium transition-colors'
			>
				Continue Shopping
			</Link>
		</div>
	);
};

export default EmptyCart;
