'use client';
import React, { useState } from 'react';
// import { SecondaryInputField } from '../Signup';
import { RadioOption, TertiaryInputField } from '../Inputs';
import { ButtonPrimary, Flex } from '../reusables';
import { usePostMutation } from '@/store/services/commonApi';
import { useDispatch } from 'react-redux';
import { setShippingInfo } from '@/store/slices/shippingInfoSlice';
import { toast } from 'react-toastify';

const ShippingInfo = ({ formData, setFormData, cartItems }: any) => {
	const dispatch = useDispatch();
	const [shippingRates, setShippingRates] = useState([]);
	const [trigger, result] = usePostMutation();
	const [triggerUpdateShipping, resultShipping] = usePostMutation();
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	// selected shipping rates
	const [selected, setSelected] = useState<{
		shippingCost: string;
		serviceName: string;
		serviceCode: string;
	} | null>(null);
	// console.log('selected:::', selected);

	// Custom messages for each field
	const fieldErrors: { [key: string]: string } = {
		email: 'Please enter your email address',
		password: 'Please enter a password',
	};
	// console.log('selected:::', selected);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (errors[e.target.name]) {
			validateField(e.target.name, e.target.value);
		}
	};

	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		validateField(e.target.name, e.target.value);
	};

	const validateField = (name: string, value: string) => {
		let message = '';
		if (!value.trim()) {
			message = fieldErrors[name] || `${name} is required`;
		}
		setErrors(prev => ({ ...prev, [name]: message }));
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		Object.keys(formData).forEach(key => {
			if (!formData[key as keyof typeof formData].trim()) {
				newErrors[key] = fieldErrors[key] || `${key} is required`;
			}
		});
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	/////////////////////// handle estimated cost
	const handleEstimateCost = async (e: any) => {
		e.preventDefault();
		const res = await trigger({
			path: 'canadapost/shipping-rates',
			body: { items: cartItems, shippingInfo: formData, customerNumber: '' },
		}).unwrap(); // unwrap to get actual data;
		// Now safely access price-quote
		// console.log('response data::', res);
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
	};

	const handleUpdateShipping = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			// send to API formdata and shipping rate
			const dispatchShipping = await triggerUpdateShipping({
				path: 'cart-total',
				body: {
					items: cartItems,
					shippingInfo: { ...formData, ...selected },
				},
			});
			// console.log('dispatchShipping:::', dispatchShipping);
			if (dispatchShipping?.data?.success) {
				dispatch(setShippingInfo(dispatchShipping?.data));
			}

			toast.success('Shipping info updated successfully!', {
				autoClose: 1000,
			});
			// console.log('dispatched data:::', dispatchShipping);
			// dispatch(setShippingInfo(dispatchShipping))
		}
	};
	// console.log('shippeing rartes state:', shippingRates);
	return (
		<form>
			<TertiaryInputField
				label='Country'
				name='country'
				value={formData.country}
				onChange={handleChange}
				error={errors.country}
				onBlur={handleBlur}
			/>
			<TertiaryInputField
				label='Province'
				name='province'
				value={formData.province}
				options={['Alberta', 'Monitoba', 'Ontario']}
				onChange={handleChange}
				error={errors.province}
				onBlur={handleBlur}
			/>
			<TertiaryInputField
				label='City'
				name='city'
				value={formData.city}
				onChange={handleChange}
				error={errors.city}
				onBlur={handleBlur}
			/>
			<TertiaryInputField
				label='Postal Code'
				name='destinationPostalCode'
				value={formData.destinationPostalCode}
				onChange={handleChange}
				error={errors.destinationPostalCode}
				onBlur={handleBlur}
			/>
			{/* api call */}
			<ButtonPrimary className='ml-auto' onClick={handleEstimateCost}>
				Estimate Cost
			</ButtonPrimary>

			{/* estimated cost for each delivery option ==> if estimated result is success then show it : for now just desing showing using state*/}
			{shippingRates?.length > 0 && (
				<div className='border-b border-secondaryBorder py-4'>
					<div>
						{shippingRates?.map((opt: any, index: number) => (
							<RadioOption
								key={index}
								label={opt?.serviceName}
								price={opt?.shippingCost}
								// price={opt?.shippingCost}
								name='shipping'
								shippingOptions={opt}
								value={opt?.serviceCode} 
								checked={selected?.serviceCode === opt?.serviceCode}
								onChange={setSelected}
							/>
						))}
					</div>
					<ButtonPrimary
						className='ml-auto w-[200px]'
						onClick={handleUpdateShipping}
					>
						Update Shipping Cost
					</ButtonPrimary>
				</div>
			)}
		</form>
	);
};

export default ShippingInfo;
