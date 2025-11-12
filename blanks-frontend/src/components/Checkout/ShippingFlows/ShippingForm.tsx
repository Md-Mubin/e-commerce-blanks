'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updatePickup, updateShippingAddress } from '@/store/slices/checkoutSlice';
import { SecondaryInputField } from '@/components/Signup';
import { useGetSelfQuery } from '@/store/services/authApi';

const ShippingForm = ({ shippingInfoFromCart }: any) => {
	const dispatch = useDispatch();
	const { data: userData, isFetching } = useGetSelfQuery({});
	const shippingAddress = useSelector(
		(state: RootState) => state.checkout.shippingAddress
	);

	const handleChange = (e: any) => {
		dispatch(updateShippingAddress({ [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		if (shippingInfoFromCart?.shippingInfo) {
			const cartShipping = shippingInfoFromCart.shippingInfo;

			dispatch(
				updateShippingAddress({
					city: shippingAddress.city || cartShipping.city || '',
					state: shippingAddress.state || cartShipping.province || '',
					postalCode: shippingAddress.postalCode || cartShipping.destinationPostalCode || '',
					country: shippingAddress.country || cartShipping.country || '',
				})
			);
		}
	}, [shippingInfoFromCart]);

useEffect(() => {
  if (userData && !isFetching && !shippingAddress.fullName) {
    dispatch(
      updateShippingAddress({ fullName: userData.name })
    );
  }
}, [userData, isFetching, dispatch, shippingAddress.fullName]);


	return (
		<div className='grid grid-cols-1 gap-2'>
			<SecondaryInputField
				label='Full Name'
				type='text'
				name='fullName'
				placeholder='Full Name'
				value={shippingAddress.fullName}
				onChange={handleChange}
			/>
			<SecondaryInputField
				label='Street Address'
				type='text'
				name='street'
				placeholder='Street Address'
				value={shippingAddress.street}
				onChange={handleChange}
			/>
			<SecondaryInputField
				label='City'
				type='text'
				name='city'
				placeholder='City'
				value={shippingAddress.city || shippingInfoFromCart?.shippingInfo?.city || ''}
				onChange={handleChange}
			/>
			<SecondaryInputField
				label='State/Province'
				type='text'
				name='state'
				placeholder='State/Province'
				value={shippingAddress.state || shippingInfoFromCart?.shippingInfo?.province || ''}
				onChange={handleChange}
			/>
			<SecondaryInputField
				label='Postal Code'
				type='text'
				name='postalCode'
				placeholder='Postal Code'
				value={
					shippingAddress.postalCode ||
					shippingInfoFromCart?.shippingInfo?.destinationPostalCode ||
					''
				}
				onChange={handleChange}
			/>
			<SecondaryInputField
				label='Country'
				type='text'
				name='country'
				placeholder='Country'
				value={shippingAddress.country || shippingInfoFromCart?.shippingInfo?.country || ''}
				onChange={handleChange}
			/>
		</div>
	);
};

export default ShippingForm;
