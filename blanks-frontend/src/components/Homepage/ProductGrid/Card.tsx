'use client';
import React from 'react';
import { CardImg, CardMain, CardPrice, CardTag } from './index';
import { PiHeartStraightLight } from 'react-icons/pi';
import { dollarSign } from '@/lib/constants';
import { Flex, PriceText, PrimaryText, TextBase } from '@/components/reusables';
import SecondaryText from '@/components/reusables/SecondaryText';

type CardProps = {
	data: any;
};

const Card = ({ data }: CardProps) => {
	return (
		<CardMain href={`/products/${data._id}`}>
			<CardImg img={data?.image} />
			<Flex className='flex-col gap-2 content-wrapper py-4 px-4'>
				<SecondaryText className='line-clamp-1 capitalize'>{data?.name}</SecondaryText>
				<SecondaryText className='text-categoryText'>{data?.category?.name}</SecondaryText>
				<TextBase className='text-primaryColor'>
					{dollarSign} {data?.price?.toFixed(2)?.toLocaleString() || '0.00'}
				</TextBase>

				{/* <CardTag className='-mt-[4px]'>For {data?.listingType}</CardTag> */}
				{/* <CardDescription data={data} /> */}
			</Flex>
		</CardMain>
	);
};

export default Card;
