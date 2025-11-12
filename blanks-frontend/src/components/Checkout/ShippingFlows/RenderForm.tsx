import React from 'react';
import { useSelector } from 'react-redux';

const RenderForm = () => {
	const {
		currentStep,
		customer,
		shippingAddress,
		billingAddress,
		useShippingAsBilling,
		paymentInfo,
		orderItems,
		subtotal,
		shippingCost,
		tax,
		grandTotal,
	} = useSelector((state: any) => state.checkout);
    // step: 0 | 1 | 2 | 3
    
	return <div></div>;
};

export default RenderForm;
