'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
	updateBillingAddress,
	toggleUseShippingAsBilling,
} from '@/store/slices/checkoutSlice';
import { SecondaryInputField } from '@/components/Signup';

const BillingForm: React.FC = () => {
	const dispatch = useDispatch();
	const { billingAddress, useShippingAsBilling } = useSelector(
		(state: RootState) => state.checkout
	);

	const handleChange = (e: any) => {
		dispatch(updateBillingAddress({ [e.target.name]: e.target.value }));
	};

	const stored = localStorage.getItem('shippingInfo');
	const shippingInfoFromCart = stored ? JSON.parse(stored) : null;

	return (
		<div className="grid grid-cols-1 gap-4">
			<label className="flex items-center">
				<input
					type="checkbox"
					checked={useShippingAsBilling}
					onChange={e =>
						dispatch(toggleUseShippingAsBilling(e.target.checked))
					}
					className="mr-2"
				/>
				Use shipping address as billing address
			</label>

			{!useShippingAsBilling || shippingInfoFromCart && (
				<>
					<SecondaryInputField
						label="Full Name"
						type="text"
						name="fullName"
						placeholder="Full Name"
						value={billingAddress?.fullName || ''}
						onChange={handleChange}
					/>
					<SecondaryInputField
						label="Street Address"
						type="text"
						name="street"
						placeholder="Street Address"
						value={billingAddress?.street || ''}
						onChange={handleChange}
					/>
					<SecondaryInputField
						label="City"
						type="text"
						name="city"
						placeholder="City"
						value={billingAddress?.city || ''}
						onChange={handleChange}
					/>
					<SecondaryInputField
						label="State/Province"
						type="text"
						name="state"
						placeholder="State/Province"
						value={billingAddress?.state || ''}
						onChange={handleChange}
					/>
					<SecondaryInputField
						label="Postal Code"
						type="text"
						name="postalCode"
						placeholder="Postal Code"
						value={ shippingInfoFromCart?.destinationPostalCode || ""}
						onChange={handleChange}
					/>
					<SecondaryInputField
						label="Country"
						type="text"
						name="country"
						placeholder="Country"
						value={billingAddress?.country || ''}
						onChange={handleChange}
					/>
				</>
			)}
		</div>
	);
};

export default BillingForm;
