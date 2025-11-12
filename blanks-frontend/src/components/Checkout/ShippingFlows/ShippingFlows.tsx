import React from 'react';
import Customer from './Customer';
import { SectionTitleText } from '@/components/reusables';

// root parent component
const ShippingFlows = () => {
	return (
		<div>
			<Customer />
			<SectionTitleText className='border-b border-secondaryBorder py-4'>
				Shipping
			</SectionTitleText>
			<SectionTitleText className='border-b border-secondaryBorder py-4'>
				Billing
			</SectionTitleText>
			<SectionTitleText className='border-b border-secondaryBorder py-4'>
				Payment
			</SectionTitleText>
		</div>
	);
};

export default ShippingFlows;
