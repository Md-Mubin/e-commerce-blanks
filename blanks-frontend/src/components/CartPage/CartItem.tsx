"use client";
import React, { useState, useMemo } from 'react';
import { QuantitySelector } from './index';
import { Trash2, TrendingDown, Info } from 'lucide-react';
import { PrimaryText } from '../reusables';
import SecondaryText from '../reusables/SecondaryText';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/slices/cartSlice';

const CartItem = ({ item }: any) => {
	const dispatch = useDispatch();
	const currentQty = item?.qty || 0;
	const discountTiers = item?.discountTiers || [];

	const discountInfo = useMemo(() => {
	if (!discountTiers || discountTiers.length === 0) return null;

	const sortedTiers = [...discountTiers].sort((a, b) => a.minQuantity - b.minQuantity);
	const lastTier = sortedTiers[sortedTiers.length - 1];

	// ✅ Always lock best price beyond last tier
	if (currentQty >= lastTier.minQuantity) {
		const currentSavings = (item.price - lastTier.price) * currentQty;

		return {
			type: 'max_tier',
			message: `You're getting the best price at $${lastTier.price} each!`,
			currentPrice: lastTier.price,
			currentSavings: currentSavings > 0 ? currentSavings : 0,
			showSavings: true,
			isMaxDiscount: true
		};
	}

	// ✅ Find current applicable tier
	const currentTier = sortedTiers.find(
		tier => currentQty >= tier.minQuantity && currentQty <= tier.maxQuantity
	);

	// ✅ Find next tier (still respecting upper bounds)
	const nextTier = sortedTiers.find(tier => tier.minQuantity > currentQty);

	if (currentQty < sortedTiers[0].minQuantity) {
		const firstTier = sortedTiers[0];
		const qtyNeeded = firstTier.minQuantity - currentQty;
		const potentialSavings = (item.price - firstTier.price) * firstTier.minQuantity;

		return {
			type: 'below_first_tier',
			message: `Buy ${qtyNeeded} more to get ${firstTier.minQuantity}+ items at $${firstTier.price} each`,
			currentPrice: item.price,
			discountPrice: firstTier.price,
			qtyNeeded,
			tierRange: `${firstTier.minQuantity}+`,
			potentialSavings: potentialSavings > 0 ? potentialSavings : 0,
			showSavings: true
		};
	}

	if (currentTier && nextTier) {
		const qtyNeeded = nextTier.minQuantity - currentQty;
		const currentSavings = (item.price - currentTier.price) * currentQty;
		const potentialAdditionalSavings = (currentTier.price - nextTier.price) * nextTier.minQuantity;

		return {
			type: 'in_tier_with_next',
			message: `Buy ${qtyNeeded} more to unlock ${nextTier.minQuantity}+ items at $${nextTier.price} each`,
			currentPrice: currentTier.price,
			discountPrice: nextTier.price,
			qtyNeeded,
			tierRange: `${nextTier.minQuantity}+`,
			currentSavings: currentSavings > 0 ? currentSavings : 0,
			potentialSavings: potentialAdditionalSavings > 0 ? potentialAdditionalSavings : 0,
			showSavings: true
		};
	}

	return null;
}, [currentQty, discountTiers, item.price]);

// ✅ Display price (always lock last tier price if qty >= lastTier.minQuantity)
const displayPrice = useMemo(() => {
	if (!discountTiers || discountTiers.length === 0) return item.price;

	const sortedTiers = [...discountTiers].sort((a, b) => a.minQuantity - b.minQuantity);
	const lastTier = sortedTiers[sortedTiers.length - 1];

	// ✅ Always use last tier price if above threshold
	if (currentQty >= lastTier.minQuantity) {
		return lastTier.price;
	}

	const applicableTier = sortedTiers.find(
		(tier: any) => currentQty >= tier.minQuantity && currentQty <= tier.maxQuantity
	);

	return applicableTier ? applicableTier.price : item.price;
}, [currentQty, discountTiers, item.price]);

	return (
		<div className='border-b border-secondaryBorder py-4 lg:py-6 relative'>
			<div className='grid grid-cols-1 lg:grid-cols-[1.15fr_0.3fr_0.5fr_0.3fr] xl:grid-cols-[1fr_0.5fr_0.5fr_0.5fr] items-center lg:gap-4 w-full'>
				{/* Product Image + des */}
				<div className='flex items-center w-full gap-4'>
					<div className='flex-shrink-0'>
						<img
							src={item?.image}
							alt={item?.name}
							className='w-auto h-[150px] object-cover rounded-sm'
						/>
					</div>
					{/* Product Details */}
					<div className='grow min-w-0'>
						<PrimaryText className='mb-2'>{item?.productName}</PrimaryText>

						<div className='text-sm space-y-1'>
							<SecondaryText>SKU: {item?.sku}</SecondaryText>
							<SecondaryText>Colour: {item?.selectedColor}</SecondaryText>
							<SecondaryText>Size: {item?.size}</SecondaryText>
						</div>

						<button className='text-primaryColor hover:text-secondaryColor font-semibold text-sm mt-2 underline'>
							Change
						</button>
					</div>
				</div>

				{/* for laptop */}
				<div className='hidden lg:block justify-self-center'>
					<SecondaryText>${displayPrice.toFixed(2)}</SecondaryText>
				</div>

				<SecondaryText className='hidden lg:flex gap-2 items-center justify-self-center'>
					<QuantitySelector item={item}/>
					<Trash2
						onClick={() => dispatch(removeFromCart(item.id))}
						className='text-primaryColor hover:text-red400 cursor-pointer w-[16px] h-[16px]'
					/>
				</SecondaryText>

				<div className='hidden lg:block justify-self-center'>
					<SecondaryText className='font-semibold'>
						${(displayPrice * currentQty).toFixed(2)}
					</SecondaryText>
				</div>

				{/* for mobile */}
				<div className='lg:hidden grid grid-cols-[1fr_2fr_1fr] gap-4 items-center mt-4'>
					<div>
						<SecondaryText className='mb-2 font-semibold'>Price</SecondaryText>
						<div className='flex flex-col'>
							<SecondaryText className='line-through text-gray-400 text-xs'>
								${item.price.toFixed(2)}
							</SecondaryText>
						</div>
					</div>

					<div>
						<SecondaryText className='mb-2 font-semibold'>
							Quantity
						</SecondaryText>
						<SecondaryText className='flex gap-2 items-center'>
							<QuantitySelector item={item} />
							<Trash2
								onClick={() => dispatch(removeFromCart(item._id))}
								className='text-primaryColor hover:text-red400 cursor-pointer w-[16px] h-[16px]'
							/>
						</SecondaryText>
					</div>

					<div>
						<SecondaryText className='mb-2 font-semibold'>Total</SecondaryText>
						<SecondaryText className='font-semibold'>
							${(displayPrice * currentQty).toFixed(2)}
						</SecondaryText>
					</div>
				</div>
			</div>

			{/* Discount Message Banner */}
			{discountInfo && (
				<div className={`mt-3 p-3 rounded-sm flex items-start gap-2 ${discountInfo.isMaxDiscount
					? ' border border-secondaryBorder'
					: ' border border-secondaryBorder'
					}`}>
					{discountInfo.isMaxDiscount ? (
						<TrendingDown className='w-4 h-4 mt-0.5 text-green-600 flex-shrink-0' />
					) : (
						<Info className='w-4 h-4 mt-0.5 flex-shrink-0' />
					)}
					<div className='flex-1'>
						<p className={`text-sm font-medium ${discountInfo.isMaxDiscount && 'text-green-700'}`}>
							{discountInfo.message}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartItem;