'use client';
import React, { useState } from 'react';

import { CartSummary, CartItem } from './index';
import { SectionLayout } from '../Layout';
import { PrimaryText, SecondaryHeading } from '../reusables';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// Main Shopping Cart Component
const ShoppingCart = () => {
	/// GET SHIPPING RATES
	// cart items
	const cartItems = useSelector((state: RootState) => state.cart.items);
	// console.log('cartItems:', cartItems);
	// Form data::: shipping cost form
	const [shippingInfo, setShippingInfo] = useState({
		country: '',
		province: '',
		city: '',
		destinationPostalCode: '',
	});


	// console.log(shippingInfo);
	const subtotal = cartItems
		? cartItems?.reduce(
				(sum: any, item: any) => sum + item.price * item.qty,
				0
		  )
		: [];
	const total = subtotal; // No shipping or coupon applied

	return (
		<SectionLayout>
			<div className='max-w-7xl mx-auto px-4 py-6'>
				{/* Breadcrumb */}
				<nav className='text-sm text-gray-500 mb-6'>
					<span className='text-primaryColor hover:text-secondaryColor cursor-pointer'>
						HOME
					</span>
					<span className='mx-2'>/</span>
					<span className='text-secondaryColor'>YOUR CART</span>
				</nav>

				{/* Page Title */}
				<SecondaryHeading className='mb-6'>
					Your Cart ({cartItems.length} items)
				</SecondaryHeading>

				{/* Alert Banners */}
				{/* <AlertBanner
				type='info'
				message='Spend another $478.99 to qualify for free shipping!'
			/>
			<AlertBanner
				type='bulk'
				message='BULK PRICING: Add 7 more eligible items to receive a 5% discount.'
			/> */}

				<div className='lg:grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
					{/* Cart Items */}
					<div className='lg:col-span-2'>
						{/* Desktop Headers */}
						<div className='hidden lg:grid lg:grid-cols-[1.08fr_0.3fr_0.53fr_0.3fr] xl:grid-cols-[1fr_0.5fr_0.5fr_0.5fr] lg:gap-4 py-3 border-b border-secondaryBorder text-sm font-medium text-gray-700 uppercase tracking-wide'>
							<PrimaryText className=''>Item</PrimaryText>
							<PrimaryText className='justify-self-center'>Price</PrimaryText>
							<PrimaryText className='justify-self-center'>
								Quantity
							</PrimaryText>
							<PrimaryText className='justify-self-center'>Total</PrimaryText>
						</div>

						{cartItems?.map((item:any, index:number) => (
							<CartItem key={index} item={item} />
						))}
					</div>

					{/* Cart Summary */}
					<div className='col-span-1 lg:col-span-2 justify-self-start lg:justify-self-end'>
						<CartSummary
							subtotal={subtotal}
							shipping={0}
							couponCode=''
							total={total}
							formData={shippingInfo}
							setFormData={setShippingInfo}
							cartItems={cartItems}
						/>
					</div>
				</div>
			</div>
		</SectionLayout>
	);
};

export default ShoppingCart;
