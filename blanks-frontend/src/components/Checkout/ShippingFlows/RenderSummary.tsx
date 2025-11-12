'use client';

import React from 'react';
import { RootState } from '@/store';
import { StepSummary } from './index';
import SecondaryText from '@/components/reusables/SecondaryText';
import { useAppDispatch, useAppSelector } from '@/hooks';

interface RenderSummaryProps {
	step: 0 | 1 | 2 | 3;
}

const RenderSummary: React.FC<RenderSummaryProps> = ({ step }) => {
	const { customer, shippingAddress, billingAddress, useShippingAsBilling, paymentInfo } =
		useAppSelector((state: RootState) => state.checkout);

	let content: any;

	switch (step) {
		case 0:
			content = <SecondaryText>{customer?.email || 'No email provided'}</SecondaryText>;
			break;
		case 1:
			content = shippingAddress ? (
				<SecondaryText>
					{shippingAddress.fullName}, {shippingAddress.street}, {shippingAddress.city},{' '}
					{shippingAddress.state}, {shippingAddress.postalCode}, {shippingAddress.country}
				</SecondaryText>
			) : (
				<p>No shipping address</p>
			);
			break;
		case 2: {
			const addr = useShippingAsBilling ? shippingAddress : billingAddress;
			content = addr ? (
				<SecondaryText>
					{addr.fullName}, {addr.street}, {addr.city}, {addr.state}, {addr.postalCode},{' '}
					{addr.country}
				</SecondaryText>
			) : (
				<SecondaryText>Same as shipping</SecondaryText>
			);
			break;
		}
		case 3:
			content = paymentInfo?.method ? (
				<SecondaryText>Method: {paymentInfo.method.replace('_', ' ')}</SecondaryText>
			) : (
				<SecondaryText>No payment method</SecondaryText>
			);
			break;
	}

	return (
		<StepSummary
			step={step}
			content={<div className='flex justify-between items-center'>{content}</div>}
		/>
	);
};

export default RenderSummary;
