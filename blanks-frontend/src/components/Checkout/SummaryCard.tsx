'use client';
import React from 'react';
import OrderItem from './OrderItem';
import SummaryRow from './SummaryRow';
import EmptyCart from './EmptyCart';
import { PrimaryText } from '../reusables';
import { useSelector } from 'react-redux';
import { useAppSelector } from '@/hooks';
import Link from 'next/link';

const SummaryCard = () => {
	const shippingInfo = useSelector((state: any) => state.shippingInfo);
	const cartItems = useSelector((state: any) => state.cart.items);

	return (
		<div className='w-[400px] border border-secondaryBorder rounded-md p-4 bg-white'>
			{/* Header */}
			<div className='flex justify-between items-center pb-3 border-b border-secondaryBorder'>
				<PrimaryText className='text-sm font-medium'>Order Summary</PrimaryText>
				<Link href='/cart' className='text-sm text-black hover:underline'>
					Edit Cart
				</Link>
			</div>

			{/* Conditional Content */}
			{cartItems?.length === 0 ? (
				<EmptyCart />
			) : (
				<>
					{/* Items */}
					<div className='pt-3'>
						<PrimaryText className='mb-2'>
							{cartItems?.length} {cartItems?.length === 1 ? 'Item' : 'Items'}
						</PrimaryText>
						{cartItems?.map((item: any, idx: number) => (
							<OrderItem key={idx} {...item} />
						))}
					</div>

					{/* Totals */}
					<div className='mt-2 border-t pt-2 border-secondaryBorder'>
						<SummaryRow
							label='Subtotal'
							value={`$${shippingInfo?.subTotal?.toFixed(2) || '0.00'}`}
						/>
						<SummaryRow
							label='Shipping'
							value={`$${shippingInfo?.shippingInfo?.shippingCost || '0.00'}`}
						/>
						<SummaryRow
							label='VAT'
							value={`$${shippingInfo?.vat?.toFixed(2) || '0.00'}`}
						/>
						<SummaryRow
							label='Discount'
							value={`-$${shippingInfo?.discount?.toFixed(2) || '0.00'}`}
						/>
					</div>

					{/* Grand Total */}
					<div className='mt-2 border-t pt-3 border-secondaryBorder'>
						<SummaryRow
							label='Total (CAD)'
							value={`$${(
								(shippingInfo?.subTotal || 0) +
								(shippingInfo?.shippingInfo?.shippingCost || 0)
							).toFixed(2)}`}
							bold
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default SummaryCard;
