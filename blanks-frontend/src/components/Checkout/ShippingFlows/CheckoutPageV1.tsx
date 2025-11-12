'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCurrentStep,
	resetCheckout,
	updatePickup,
} from '@/store/slices/checkoutSlice';
import { RootState } from '@/store';
import { ButtonPrimary } from '@/components/reusables';

// Forms
import {
	CustomerForm,
	StepWrapper,
	ShippingForm,
	BillingForm,
	PaymentForm,
	RenderSummary,
} from './index';

import {
	validateAddress,
	validateCustomer,
	validatePayment,
} from '@/lib/checkoutValidation';
import { usePostMutation } from '@/store/services/commonApi';
import { useGetSelfQuery } from '@/store/services/authApi';
import { toast, ToastContainer } from 'react-toastify';

const CheckoutPage: React.FC = () => {
	const self = useGetSelfQuery({});
	// const { isPickup } = useSelector((state: RootState) => state.checkout);
	const [trigger, result] = usePostMutation();
	const [triggerOrder, resultOrder] = usePostMutation();
	const [cartTotal, setCartTotal] = useState<any>(null);
	// while checkout also send this
	const shippingInfoes = useSelector((state: any) => state?.shippingInfo);
	const cartItems = useSelector((state: any) => state?.cart?.items);
	// console.log('cart items::', cartItems);
	// console.log('shippingInfoes', shippingInfoes);
	// console.log('cartTotal', cartTotal);
	const dispatch = useDispatch();
	const {
		currentStep,
		customer,
		shippingAddress,
		billingAddress,
		useShippingAsBilling,
		paymentInfo,
		isPickup,
	} = useSelector((state: RootState) => state.checkout);
	// console.log('payment info:', self);
	const handleContinue = () => {
		let isValid: any = false;

		switch (currentStep) {
			case 0:
				isValid = validateCustomer(customer);
				break;
			case 1:
				isValid = validateAddress(shippingAddress);
				// also hit the shipping api to get the shipping rates
				// also keep a checkbox to know if it is pickup or will be shipped!
				break;
			case 2:
				isValid = useShippingAsBilling || validateAddress(billingAddress!);
				break;
			case 3:
				isValid = validatePayment(paymentInfo);
				// //////////////////// PLACE ORDER
				if (isValid) {
					// console.log('Order placed:', {
					// 	customer,
					// 	shippingAddress,
					// 	billingAddress,
					// 	paymentInfo,
					// 	isPickup,
					// 	cart: cartTotal,
					// 	user: self?.data ? self?.data?._id : null,
					// });
					triggerOrder({
						path: 'orders',
						body: {
							customer,
							shippingAddress,
							billingAddress,
							paymentInfo,
							isPickup,
							cart: cartTotal,
							user: self?.data ? self?.data?._id : null,
						},
					});
					// dispatch(resetCheckout());
					return;
				}
				break;
		}

		if (isValid) {
			// dispatch(setCurrentStep((currentStep + 1) as 0 | 1 | 2));
			dispatch(setCurrentStep((currentStep + 1) as 0 | 1 | 2 | 3));
		} else {
			console.log('fill the required fields!');
		}
	};
	const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updatePickup(e.target.checked));
	};

	const steps = ['Customer', 'Shipping', 'Billing', 'Payment'];

	// cart total
	useEffect(() => {
		const fetchCartTotal = async () => {
			try {
				const cartTotals = await trigger({
					path: 'cart-total',
					body: { items: cartItems },
				}).unwrap();
				setCartTotal(cartTotals);
			} catch (error) {
				console.error('Error fetching cart total:', error);
			}
		};

		fetchCartTotal();
	}, [cartItems, trigger]);
	// order
	useEffect(() => {
		if (resultOrder?.isSuccess) {
			toast.success('Order placed');
		}
		if (resultOrder?.isError) {
			toast.error('Order not placed');
		}
	}, [resultOrder]);
	return (
		<div className='md:w-2/3'>
			<ToastContainer />
			{steps.map((stepName, index) => {
				const stepIndex = index as 0 | 1 | 2 | 3;
				const isActive = stepIndex === currentStep;

				return (
					<StepWrapper key={stepName} title={stepName} isActive={isActive}>
						{isActive && (
							<>
								{stepIndex === 0 && <CustomerForm />}
								{/* is pickup  */}
								{/* <label className='flex items-center gap-2'>
									<input
										type='checkbox'
										name='isPickup'
										checked={isPickup}
										onChange={handlePickupChange}
										className='w-4 h-4'
									/>
									Pickup
								</label> */}
								{stepIndex === 1 && <ShippingForm />}
								{stepIndex === 2 && <BillingForm />}
								{stepIndex === 3 && <PaymentForm />}
								<ButtonPrimary
									onClick={handleContinue}
									className='mt-4 rounded-sm'
								>
									{stepIndex === 3 ? 'Place Order' : 'Continue'}
								</ButtonPrimary>
							</>
						)}

						{/* ✅ show summary when step is already completed */}
						{stepIndex < currentStep && <RenderSummary step={stepIndex} />}
					</StepWrapper>
				);
			})}
		</div>
	);
};

export default CheckoutPage;
