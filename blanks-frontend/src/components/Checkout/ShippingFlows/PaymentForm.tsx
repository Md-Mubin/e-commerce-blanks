'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updatePaymentInfo } from '@/store/slices/checkoutSlice';
import { SecondaryInputField } from '@/components/Signup';

const PaymentForm: React.FC = () => {
	const dispatch = useDispatch();
	const paymentInfo = useSelector((state: RootState) => state.checkout.paymentInfo);

	const handleChange = (e: any) => {
		dispatch(updatePaymentInfo({ [e.target.name]: e.target.value }));
	};

	const handleMethodChange = (method: any) => {
		dispatch(updatePaymentInfo({ method }));
	};

	return (
		<div className='grid grid-cols-1 gap-4'>
			<label className='flex items-center'>
				<input
					type='radio'
					name='method'
					value='credit_card'
					checked={paymentInfo.method === 'credit_card'}
					onChange={() => handleMethodChange('credit_card')}
					className='mr-2'
				/>
				Credit Card
			</label>

			{/* {paymentInfo.method === 'credit_card' && (
				<div className='grid grid-cols-1 gap-4 pl-4'>
					<SecondaryInputField
						name='nameOnCard'
						type='text'
						placeholder='Name on Card'
						value={paymentInfo.nameOnCard || ''}
						onChange={handleChange}
					/>
					<SecondaryInputField
						name='cardNumber'
						type='text'
						placeholder='Card Number'
						value={paymentInfo.cardNumber || ''}
						onChange={handleChange}
					/>
					<div className='grid grid-cols-2 gap-4'>
						<SecondaryInputField
							name='expiry'
							type='text'
							placeholder='MM/YY'
							value={paymentInfo.expiry || ''}
							onChange={handleChange}
						/>
						<SecondaryInputField
							name='cvv'
							type='text'
							placeholder='CVV'
							value={paymentInfo.cvv || ''}
							onChange={handleChange}
						/>
					</div>
				</div>
			)} */}

			<label className='flex items-center'>
				<input
					type='radio'
					name='method'
					value='paypal'
					checked={paymentInfo.method === 'paypal'}
					onChange={() => handleMethodChange('paypal')}
					className='mr-2'
				/>
				PayPal
			</label>

			<label className='flex items-center'>
				<input
					type='radio'
					name='method'
					value='apple_pay'
					checked={paymentInfo.method === 'apple_pay'}
					onChange={() => handleMethodChange('apple_pay')}
					className='mr-2'
				/>
				Apple Pay
			</label>

			<label className='flex items-center'>
				<input
					type='radio'
					name='method'
					value='interac'
					checked={paymentInfo.method === 'stripe'}
					onChange={() => handleMethodChange('stripe')}
					className='mr-2'
				/>
				Interac e-Transfer
			</label>
		</div>
	);
};

export default PaymentForm;
