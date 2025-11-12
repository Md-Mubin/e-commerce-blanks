import React from 'react';
import { PrimaryText } from '../reusables';

interface OrderItemProps {
	name: string;
	image: string;
	title: string;
	qty: number;
	price: number;
	color: string;
	size: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ name, image, qty, price, color, size }) => {
	return (
		<div className='flex justify-between py-3'>
			<div className='flex space-x-3'>
				<img
					src={image}
					alt={name}
					className='w-14 h-full object-cover'
				/>
				<div>
					<PrimaryText className=''>{name}</PrimaryText>
					<PrimaryText className=''>
						{qty} x ${price?.toFixed(2)?.toLocaleString()}
					</PrimaryText>
					{/* <PrimaryText className='text-xs font-normal'>
						Colour {color}
					</PrimaryText> */}
					<PrimaryText className='text-xs font-normal'>Size {size}</PrimaryText>
				</div>
			</div>
			<PrimaryText className='text-sm text-gray-800'>
				${(Number(qty) * Number(price))?.toFixed(2)?.toLocaleString()}
			</PrimaryText>
		</div>
	);
};

export default OrderItem;
