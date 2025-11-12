import React from 'react';
import { SectionHeader } from '../reusables';

const Description = ({description}: {description: string}) => {
	return (
		<div>
			<SectionHeader title='Description' underlineMarginLeft='ml-[109px]' />
			<p className='text-secondaryColor'>{description}</p>
		</div>
	);
};

export default Description;
