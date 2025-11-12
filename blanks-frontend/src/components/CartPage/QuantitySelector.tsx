import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SecondaryText from '../reusables/SecondaryText';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '@/store/slices/cartSlice';

const QuantitySelector = ({ item }: any) => {
	const dispatch = useDispatch();

	const getTierPrice = (qty: number) => {
		const tiers = item?.discountTiers || [];
		if (tiers.length === 0) return item.price;

		const sortedTiers = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);
		const lastTier = sortedTiers[sortedTiers.length - 1];

		if (qty >= lastTier.minQuantity) return lastTier.price;

		const applicable = sortedTiers.find(
			(tier: any) => qty >= tier.minQuantity && qty <= tier.maxQuantity
		);

		return applicable ? applicable.price : item.price;
	};

	const handleIncrease = () => {
		const newQty = item.qty + 1;
		const newPrice = getTierPrice(newQty);
		dispatch(updateQuantity({
			id: item.id,
			qty: newQty,
			price: newPrice,
		}));
	};

	const handleDecrease = () => {
		const newQty = item.qty - 1;
		const newPrice = getTierPrice(newQty);
		dispatch(updateQuantity({
			id: item.id,
			qty: newQty,
			price: newPrice,
		}));
	};

	return (
		<div className='flex items-center border border-secondaryBorder rounded'>
			<button
				onClick={handleDecrease}
				className='px-3 py-1 hover:bg-gray-100 transition-colors'
			>
				<ChevronDown className='w-4 h-4 text-primaryColor' />
			</button>
			<SecondaryText className='inline-block px-4 py-1 border-l border-r border-secondaryBorder min-w-[50px] font-semibold text-center'>
				{item?.qty}
			</SecondaryText>
			<button
				onClick={handleIncrease}
				className='px-3 py-1 hover:bg-gray-100 transition-colors'
			>
				<ChevronUp className='w-4 h-4 text-primaryColor' />
			</button>
		</div>
	);
};

export default QuantitySelector;
