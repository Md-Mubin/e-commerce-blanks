import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentStep } from '@/store/slices/checkoutSlice';
import SecondaryText from '@/components/reusables/SecondaryText';

type StepSummaryProps = {
	step: number;
	content: any;
};

const StepSummary: React.FC<StepSummaryProps> = ({ step, content }) => {
	const dispatch = useDispatch();

	return (
		<div className='flex justify-between items-center gap-2'>
			<SecondaryText>{content}</SecondaryText>
			<button
				onClick={() => dispatch(setCurrentStep(step as 0 | 1 | 2 | 3))}
				className='cursor-pointer text-black hover:underline'>
				Edit
			</button>
		</div>
	);
};

export default StepSummary;
