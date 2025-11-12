'use client';
import React, { useEffect, useState } from 'react';
import { Flex, InputField, SectionTitleText } from '../reusables';
import Container from '../reusables/Container';
import { IoSearchOutline } from 'react-icons/io5';
import { usePostMutation } from '@/store/services/commonApi';
import { toast, ToastContainer } from 'react-toastify';

const Subscription = () => {
	const [trigger, result] = usePostMutation();
	const [email, setEmail] = useState('');
	const handleSubscribe = () => {
		trigger({
			path: 'subscribers',
			body: { email },
		});
	};
	useEffect(() => {
		if (result.isSuccess) {
			toast.success('Subscription successfull');
		}
		if (result.isError) {
			toast.error('Subscription successfull');
		}
	}, [result]);
	return (
		<div className='bg-secondaryColor py-6'>
			<ToastContainer />
			<Container>
				<Flex className='flex-col sm:flex-row justify-between items-center gap-4'>
					<SectionTitleText className='text-[16px] lg:text-[20px] uppercase text-white'>
						Subscribe to our newsletter
					</SectionTitleText>
					<div className='grow relative w-full sm:max-w-[480px] rounded-sm overflow-hidden'>
						<InputField
							name='email'
							placeholder='Your email address'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className={
								'ring-0 focus:ring-0 border-2 bg-white border-transparent focus:border-transparent'
							}
						/>

						<div
							className='w-[max-content] uppercase px-4 text-md text-black-original h-[44px] absolute top-0 right-[0] bg-bodyColor group-focus-within:text-button flex justify-center items-center cursor-pointer'
							onClick={handleSubscribe}
						>
							Subscribe
						</div>
					</div>
				</Flex>
			</Container>
		</div>
	);
};

export default Subscription;
