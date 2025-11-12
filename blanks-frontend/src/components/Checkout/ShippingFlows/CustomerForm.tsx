'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomer } from '@/store/slices/checkoutSlice';
import { RootState } from '@/store';
import { SecondaryInputField } from '@/components/Signup';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useGetSelfQuery } from '@/store/services/authApi';

const CustomerForm: React.FC = () => {
	const { data } = useGetSelfQuery({});
	const dispatch = useAppDispatch();
	const customer = useAppSelector(
		(state: RootState) => state.checkout.customer
	);

	useEffect(() => {
		if (data) {
			dispatch(updateCustomer({ email: data.email || '' }));
		}
	}, [data, dispatch]);
	const { data: userData, isFetching } = useGetSelfQuery({});
	useEffect(() => {
		if (userData && !isFetching && !customer.email) {
			dispatch(updateCustomer({ email: userData.email }));
		}
	}, [userData, isFetching, dispatch, customer.email]);
	return (
		<div className='grid grid-cols-1 gap-4'>
			<SecondaryInputField
				label='Email'
				name='customerEmail'
				type='email'
				placeholder='Email'
				value={customer?.email || ''}
				onChange={e => dispatch(updateCustomer({ email: e.target.value }))}
				className='mb-0'
			/>
		</div>
	);
};

export default CustomerForm;
