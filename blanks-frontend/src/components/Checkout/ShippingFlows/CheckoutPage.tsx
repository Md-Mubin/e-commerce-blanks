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
import { validateAddress, validateCustomer, validatePayment } from '@/lib/checkoutValidation';
import { setCurrentStep, updatePickup } from '@/store/slices/checkoutSlice';
import { resetShippingInfo, setShippingInfo } from '@/store/slices/shippingInfoSlice';
import { clearCart } from '@/store/slices/cartSlice';
import Pickup from './Pickup';

const CheckoutPage: React.FC = () => {
	const dispatch = useDispatch();
	const self = useGetSelfQuery({});
	const [trigger] = usePostMutation();
	const [triggerShippingRate, resultShippingRate] = usePostMutation();
	const [triggerOrder, orderResult] = usePostMutation();
	const [triggerCartTotal] = usePostMutation(); // for shipping rate updates
	const [cartTotal, setCartTotal] = useState<any>(null);
	const [shippingRates, setShippingRates] = useState<any[]>([]);
	const [selectedRate, setSelectedRate] = useState<any>(null);
	const [isFetchingRates, setIsFetchingRates] = useState(false);
	const shippingInfoFromCart = useSelector((state: any) => state?.shippingInfo);

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

	// ✅ Continue button logic
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
				} else isValid = validateAddress(shippingAddress);
				break;
			case 2:
				isValid = useShippingAsBilling || validateAddress(billingAddress!);
				break;
			case 3:
				isValid = validatePayment(paymentInfo);
				if (isValid) placeOrder();
				return;
		}
		if (isValid) dispatch(setCurrentStep((currentStep + 1) as 0 | 1 | 2 | 3));
		else toast.error('Please fill all required fields');
	};

	// ✅ Place Order
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

	useEffect(() => {
		if (resultShippingRate?.isSuccess && !resultShippingRate?.isLoading) {
			toast.success('Shipping rates fetched successfully!');
			dispatch(resetShippingInfo());
			dispatch(clearCart());
		}
	}, [orderResult?.isSuccess]);

	useEffect(() => {
		if (orderResult?.isError && !orderResult?.isLoading) {
			toast.error((orderResult as any)?.error?.data?.message || 'Order placement failed');
		}
	}, [orderResult?.isError]);

	// ✅ Toggle pickup
	const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updatePickup(e.target.checked));
	};

	// ✅ Fetch initial cart total
	useEffect(() => {
		const fetchCartTotal = async () => {
			try {
				const cartTotals = await trigger({
					path: 'cart-total',
					body: { items: cartItems },
				}).unwrap();
				setCartTotal(cartTotals);

				// ✅ Only dispatch if shippingInfo doesn't exist yet
				const existingShippingInfo = localStorage.getItem('shippingInfo');
				if (!existingShippingInfo) {
					dispatch(setShippingInfo(cartTotals));
				}
			} catch (error) {
				console.error('Error fetching cart total:', error);
			}
		};
		fetchCartTotal();
	}, [cartItems, trigger, dispatch]);

	// ✅ Fetch Canada Post rates (postal code change)
	useEffect(() => {
		const fetchRates = async () => {
			if (!shippingAddress?.postalCode || isPickup) return;
			try {
				setIsFetchingRates(true);

				const res = await triggerShippingRate({
					path: 'canadapost/shipping-rates',
					body: {
						items: cartItems,
						shippingInfo: {
							destinationPostalCode: shippingAddress.postalCode,
						},
					},
				}).unwrap();

				const data = res;
				if (data.success) {
					const quotes = data?.data?.['price-quotes']?.['price-quote'] || [];
					const formatted = Array.isArray(quotes)
						? quotes.map((q: any) => ({
								serviceName: q['service-name'],
								serviceCode: q['service-code'],
								price: Number(q['price-details']?.due || 0),
						  }))
						: [];

					setShippingRates(formatted);

					if (formatted.length > 0) {
						handleSelectRate(formatted[0]);
					}
				} else {
					toast.error('Failed to fetch shipping rates');
				}
			} catch (err) {
				toast.error('Error fetching shipping rates');
			} finally {
				setIsFetchingRates(false);
			}
		};
		// ✅ Add debounce delay (e.g. 1.2 seconds after typing stops)
		const timeoutId = setTimeout(() => {
			fetchRates();
		}, 1200);
		// Cleanup timeout if user changes postal code again before timeout completes
		return () => clearTimeout(timeoutId);
	}, [shippingAddress?.postalCode, isPickup]);

	// ✅ Handle selecting a shipping rate (fetch new cart total)
	const handleSelectRate = async (rate: any) => {
		try {
			setSelectedRate(rate);
			const updatedCart = await triggerCartTotal({
				path: 'cart-total',
				body: {
					items: cartItems,
					shippingInfo: { shippingCost: rate.price },
				},
			}).unwrap();
			setCartTotal(updatedCart);
			dispatch(setShippingInfo(updatedCart));
		} catch (e) {
			console.error('Error updating cart total:', e);
		}
	};

	// ✅ Steps
	const steps = isPickup ? ['Customer', 'Payment'] : ['Customer', 'Shipping', 'Billing', 'Payment'];

	return (
		<div className='md:w-2/3'>
			<ToastContainer />
			{steps.map((stepName, index) => {
				const stepIndex = index as 0 | 1 | 2 | 3;
				const isActive = stepIndex === currentStep;

				return (
					<StepWrapper
						key={stepName}
						title={stepName}
						isActive={isActive}>
						{isActive && (
							<>
								{/* ✅ Step 1 - Customer */}
								{stepIndex === 0 && (
									<>
										<CustomerForm />
										{/* ✅ Only show pickup checkbox if NO shippingInfoFromCart */}
										{!shippingInfoFromCart?.shippingInfo?.destinationPostalCode && (
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

												{isPickup && <Pickup />}
											</div>
										)}
									</>
								)}

								{/* ✅ Step 2 - Shipping */}
								{!isPickup && stepIndex === 1 && (
									<>
										<ShippingForm shippingInfoFromCart={shippingInfoFromCart} />
										{/* Shipping Rates */}
										{!shippingInfoFromCart?.shippingInfo && (
											<div className='mt-4'>
												<h3 className='font-semibold text-lg mb-2'>Shipping Options</h3>
												{isFetchingRates && <p>Loading rates...</p>}
												{!isFetchingRates &&
													shippingRates.length === 0 &&
													!shippingInfoFromCart && <p>No rates available.</p>}

												{shippingRates?.map((rate, idx) => (
													<div
														key={idx}
														className='flex items-center gap-3 mb-2'>
														<input
															type='radio'
															name='shippingRate'
															checked={selectedRate?.serviceCode === rate.serviceCode}
															onChange={() => handleSelectRate(rate)}
														/>
														<div className='flex flex-col'>
															<span className='text-sm font-medium'>
																Canadapost({rate?.serviceName})
															</span>
															<span className='text-xs font-medium text-secondaryColor'>
																${rate?.price?.toFixed(2)}
															</span>
														</div>
													</div>
												))}
											</div>
										)}
									</>
								)}

								{/* ✅ Step 3 - Billing */}
								{!isPickup && stepIndex === 2 && <BillingForm />}

								{/* ✅ Step 4 - Payment */}
								{((!isPickup && stepIndex === 3) || (isPickup && stepIndex === 1)) && (
									<PaymentForm />
								)}

								<ButtonPrimary
									isLoading={orderResult?.isLoading}
									onClick={handleContinue}
									className='mt-4 rounded-sm'>
									{(isPickup && stepIndex === 1) || (!isPickup && stepIndex === 3)
										? 'Place Order'
										: 'Continue'}
								</ButtonPrimary>
							</>
						)}

						{stepIndex < currentStep && <RenderSummary step={stepIndex} />}
					</StepWrapper>
				);
			})}
		</div>
	);
};

export default CheckoutPage;
