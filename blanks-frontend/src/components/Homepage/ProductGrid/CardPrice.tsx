import { Flex } from '@/components/reusables';
import React from 'react';
import { PiHeartStraightLight } from 'react-icons/pi';
const CardPrice = ({children}:any) => {

	return (
		<Flex className='justify-between gap-4'>
			{children}
		</Flex>
	);
};

export default CardPrice;
