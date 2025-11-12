import { SecondaryHeading } from '@/components/reusables';
import React from 'react';

type StepWrapperProps = {
	title: string;
	isActive: boolean;
	children: React.ReactNode;
};

const StepWrapper: React.FC<StepWrapperProps> = ({
	title,
	isActive,
	children,
}) => {
	return (
		<div
			className={`mb-6 border-b border-secondaryBorder pb-4 ${
				isActive ? 'white' : 'white'
			}`}
		>
			<SecondaryHeading className='flex justify-between items-center mb-2'>
				{title}
			</SecondaryHeading>
			{children}
		</div>
	);
};

export default StepWrapper;
