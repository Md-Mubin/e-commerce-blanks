'use client';
import React, { useState } from 'react';
import { ButtonPrimary, Flex, PrimaryText } from '../reusables';

interface SummaryRowProps {
	label: string;
	value: string;
	bold?: boolean;
	link?: boolean;
}

const SummaryRow: React.FC<SummaryRowProps> = ({
	label,
	value,
	bold,
	link,
}) => {
	const [showCupon, setShowCupon] = useState(false);
	const [couponCodeVal, setCouponCodeVal] = useState('');
	const handleCouponChange = () => {};
	if (link) {
		return (
			<div>
				<div className='flex justify-between py-1'>
					<div
						className='text-sm text-primaryColor font-bold hover:underline'
						onClick={() => setShowCupon(!showCupon)}
					>
						{label}
					</div>
					<span className='text-primaryColor'>{value}</span>
				</div>
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
			</div>
		);
	}
	return (
		<div
			className={`flex justify-between py-1 ${
				bold ? 'font-bold text-lg' : 'text-sm'
			}`}
		>
			<PrimaryText>{label}</PrimaryText>
			<PrimaryText>{value}</PrimaryText>
		</div>
	);
};

export default SummaryRow;
