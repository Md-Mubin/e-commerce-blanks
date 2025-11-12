'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import {
	ButtonPrimary,
	StepWrapper,
	RenderSummary,
	CustomerForm,
	ShippingForm,
	BillingForm,
	PaymentForm,
} from '@/components';
import { useGetSelfQuery } from '@/store/services/authApi';
import { usePostMutation } from '@/store/services/commonApi';
import {
	validateAddress,
	validateCustomer,
	validatePayment,
} from '@/lib/checkoutValidation';
import { setCurrentStep, updatePickup } from '@/store/slices/checkoutSlice';

const CheckoutPage: React.FC = () => {
	const dispatch = useDispatch();
	const self = useGetSelfQuery({});
	const [trigger, result] = usePostMutation();
	const [triggerOrder, resultOrder] = usePostMutation();
	const [cartTotal, setCartTotal] = useState<any>(null);

	const {
		currentStep,
		customer,
		shippingAddress,
		billingAddress,
		useShippingAsBilling,
		paymentInfo,
		isPickup,
		pickupDate,
		pickupTime,
	} = useSelector((state: any) => state.checkout);
	const cartItems = useSelector((state: any) => state?.cart?.items);


	const handleContinue = () => {
		let isValid: any = false;

		switch (currentStep) {
			case 0:
				isValid = validateCustomer(customer);
				break;
			case 1:
				if (isPickup) {
					isValid = validatePayment(paymentInfo);
					if (isValid) placeOrder();
					return;
				} else {
					isValid = validateAddress(shippingAddress);
				}
				break;
			case 2:
				isValid = useShippingAsBilling || validateAddress(billingAddress!);
				break;
			case 3:
				isValid = validatePayment(paymentInfo);
				if (isValid) placeOrder();
				return;
		}

		if (isValid) {
			dispatch(setCurrentStep((currentStep + 1) as 0 | 1 | 2 | 3));
		} else {
			console.log('Please fill the required fields!');
		}
	};

	const placeOrder = () => {
		triggerOrder({
			path: 'orders',
			body: {
				cart: cartTotal,
				isPaid: false,
				customer,
				user: self?.data ? self?.data?._id : null,
				paymentInfo,
				isPickup,
				pickupDate,
				pickupTime,
				shippingAddress,
				billingAddress,
			},
		});
	};

	const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updatePickup(e.target.checked));
	};

	// Fetch cart total
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

	// Show order success/error
	useEffect(() => {
		if (resultOrder?.isSuccess) toast.success('Order placed');
		if (resultOrder?.isError) toast.error('Order not placed');
	}, [resultOrder]);

	// Determine which steps to render based on pickup
	const steps = isPickup
		? ['Customer', 'Payment']
		: ['Customer', 'Shipping', 'Billing', 'Payment'];

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
								{/* CUSTOMER STEP */}
								{stepIndex === 0 && (
									<>
										<CustomerForm />
										<div className='mt-4 flex flex-col gap-2'>
											<label className='flex items-center gap-2'>
												<input
													type='checkbox'
													name='isPickup'
													checked={isPickup}
													onChange={handlePickupChange}
													className='w-4 h-4'
												/>
												<span>Pickup From Ottawa</span>
											</label>

											{/* Pickup date/time fields when pickup selected */}
											{isPickup && (
												<div className='flex flex-col md:flex-row gap-4 mt-2'>
													<div>
														<label className='block text-sm mb-1'>
															Pickup Date
														</label>
														<input
															type='date'
															className='border p-2 rounded w-full'
															onChange={e =>
																dispatch({
																	type: 'checkout/updatePickupDate',
																	payload: e.target.value,
																})
															}
														/>
													</div>
													<div>
														<label className='block text-sm mb-1'>
															Pickup Time
														</label>
														<input
															type='time'
															className='border p-2 rounded w-full'
															onChange={e =>
																dispatch({
																	type: 'checkout/updatePickupTime',
																	payload: e.target.value,
																})
															}
														/>
													</div>
												</div>
											)}
										</div>
									</>
								)}

								{/* SHIPPING, BILLING, PAYMENT */}
								{!isPickup && stepIndex === 1 && <ShippingForm />}
								{!isPickup && stepIndex === 2 && <BillingForm />}
								{((!isPickup && stepIndex === 3) ||
									(isPickup && stepIndex === 1)) && <PaymentForm />}

								<ButtonPrimary
									onClick={handleContinue}
									className='mt-4 rounded-sm'
								>
									{isPickup
										? stepIndex === 1
											? 'Place Order'
											: 'Continue'
										: stepIndex === 3
										? 'Place Order'
										: 'Continue'}
								</ButtonPrimary>
							</>
						)}

						{/* ✅ Summary when step completed */}
						{stepIndex < currentStep && <RenderSummary step={stepIndex} />}
					</StepWrapper>
				);
			})}
		</div>
	);
};

export default CheckoutPage;
