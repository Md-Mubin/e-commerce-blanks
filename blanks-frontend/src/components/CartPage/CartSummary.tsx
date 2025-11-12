'use client';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../reusables/PrimaryButton';
import { ButtonPrimary, Flex, PrimaryText } from '../reusables';
import { ShippingInfo } from '../ShippingInfo';
// import { SecondaryInputField } from '../Signup';
import { useDispatch, useSelector } from 'react-redux';
import { CustomerForm, ShippingForm } from '../Checkout';
import { updatePickup } from '@/store/slices/checkoutSlice';
import { usePostMutation } from '@/store/services/commonApi';
import { toast } from 'react-toastify';

const CartSummary = ({
	subtotal,
	shipping,
	couponCode,
	total,
	formData,
	setFormData,
	cartItems,
	cartData,
}: any) => {
	const shippingSliceVal = useSelector((state: any) => state?.shippingInfo);
	// console.log('shipping infos666666:::', shippingSliceVal);
	// console.log(
	// 	'shipping infos666666:::',
	// 	shippingSliceVal?.shippingInfo?.shippingCost
	// );
	const shippingCost = shippingSliceVal?.shippingInfo?.shippingCost
		? shippingSliceVal?.shippingInfo?.shippingCost
		: 0;
	const [showInfo, setShowInfo] = useState(false);
	const [showCupon, setShowCupon] = useState(false);
	const [couponCodeVal, setCouponCodeVal] = useState('');
	const dispatch = useDispatch();
	const [isFetchingRates, setIsFetchingRates] = useState(false);
	const [triggerShippingRate, resultShippingRate] = usePostMutation();
	const [shippingRates, setShippingRates] = useState<any[]>([]);
	const [postal, setPostal] = useState('');

	const { shippingAddress, isPickup } = useSelector(
		(state: any) => state.checkout
	);

	useEffect(() => {
		dispatch(updatePickup(true));
	}, [dispatch]);

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
				}).unwrap(); // unwrap to get actual data;
				// console.log('response data1:', res);

				console.log('response data4:', res);

				if (res?.success) {
					const priceQuotes = res?.data;
					const shippingInfos = priceQuotes?.map((quote: any) => {
						return {
							shippingCost: quote?.totalCost,
							// totalCost: quote?.totalCost,
							serviceName: `Canadapost ${quote?.serviceName}`,
							serviceCode: quote?.serviceCode,
						};
					});

					setShippingRates(shippingInfos);

					// if (shippingInfos?.length > 0) {
					// 	handleSelectRate(shippingInfos[0]);
					// }
				} else {
					toast.error('Failed to fetch shipping rates');
				}
			} catch (err) {
				console.error(err);
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
	}, [shippingAddress?.postalCode, isPickup, cartItems]);

	const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updatePickup(e.target.checked));

		// If pickup turned ON again → hide Add Info form automatically
		if (e.target.checked) {
			setShowInfo(false);
		}
	};

	const handleCouponChange = () => {
		// set coupon code
	};

	const [isActive, setIsActive] = useState(true);
	console.log('cart data::', cartData);
	return (
		<div className='bg-white/70 rounded-md p-6 mt-8 w-[310px] lg:min-w-[400px]'>
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<PrimaryText className='text-secondaryColor'>Subtotal:</PrimaryText>
					<PrimaryText className='text-secondaryColor'>
						${subtotal.toFixed(2)}
					</PrimaryText>
				</div>

				<div className='flex justify-between items-start'>
					<PrimaryText>Shipping:</PrimaryText>
					<div>
						{isActive && (
							<>
								<CustomerForm />
								<Flex className='mt-4 flex-col items-end gap-4'>
									<Flex className=' gap-10'>
										<label className='flex items-center gap-2 cursor-pointer'>
											<input
												type='checkbox'
												name='isPickup'
												checked={isPickup}
												onChange={handlePickupChange}
												className='w-3 h-3'
											/>
											<span className='text-sm'>Pickup</span>
										</label>

										<div
											onClick={() => {
												// Only allow Add Info toggle if pickup is OFF
												if (!isPickup) setShowInfo(!showInfo);
											}}
											className={`${
												isPickup
													? 'opacity-40 cursor-not-allowed'
													: 'cursor-pointer opacity-100'
											}`}
										>
											<PrimaryText className='border-b'>
												{showInfo ? 'Cancel' : 'Add Info'}
											</PrimaryText>
										</div>
									</Flex>

									{/* Pickup date/time fields when pickup selected */}
									{isPickup && (
										<div className='flex flex-col w-full gap-4 '>
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
								</Flex>
							</>
						)}
					</div>
				</div>

				{/* shipping info */}
				{showInfo && (
					<ShippingInfo
						formData={formData}
						setFormData={setFormData}
						cartItems={cartItems}
					/>
				)}

				<div className='flex justify-between items-center'>
					<PrimaryText>Coupon Code:</PrimaryText>
					<div onClick={() => setShowCupon(!showCupon)}>
						<PrimaryText className='border-b cursor-pointer'>
							{showCupon ? 'Cancel' : 'Add Coupon'}
						</PrimaryText>
					</div>
				</div>
				{/* show cupon  */}

				{showCupon && (
					<Flex className='gap-2 items-center'>
						<input
							name='couponCode'
							value={couponCodeVal}
							onChange={handleCouponChange}
							placeholder='Enter coupon code'
							className={`border px-2 py-[6px] outline-none focus:border-black border-secondaryBorder`}
						/>
						<ButtonPrimary onClick={handleCouponChange}>Apply</ButtonPrimary>
					</Flex>
				)}

				<div className='border-t border-secondaryBorder pt-4'>
					<div className='flex justify-between items-center text-lg font-semibold text-gray-900'>
						<PrimaryText>Grand total:</PrimaryText>
						<PrimaryText className='text-[18px]'>
							${(total + shippingCost).toFixed(2)}
						</PrimaryText>
					</div>
				</div>

				<ButtonPrimary
					className='w-full'
					linkBtnClasses='bg-black shadow-sm text-primaryColor hover:bg-red400 duration-300'
					href='/checkout'
				>
					CHECK OUT
				</ButtonPrimary>
			</div>
		</div>
	);
};

export default CartSummary;
