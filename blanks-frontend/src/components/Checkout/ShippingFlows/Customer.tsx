'use client';
import { ButtonPrimary, Flex, SectionTitleText } from '@/components/reusables';
import SecondaryText from '@/components/reusables/SecondaryText';
import { SecondaryInputField } from '@/components/Signup';
import Link from 'next/link';
import React from 'react';

const Customer = () => {
	const handleCutomer = (e: any) => {};
	const hanldeStep = () => {};
	return (
		<div>
			<div className='border-b border-secondaryBorder pb-4'>
				<SectionTitleText className='mb-8'>Customer</SectionTitleText>
				{/* if no customer value */}
				<Flex className='flex-col gap-2'>
					<Flex className='gap-2 items-center justify-between w-full md:max-w-[600px]'>
						<SecondaryInputField
							label='Email'
							name=''
							value=''
							onChange={handleCutomer}
						/>
						<ButtonPrimary className='mt-2 rounded-sm' onClick={hanldeStep}>
							Continue
						</ButtonPrimary>
					</Flex>
					<Flex className='gap-2 items-center'>
						<input type='checkbox' className='' />
						<SecondaryText>Subscribe to our newsletter.</SecondaryText>
					</Flex>
					<SecondaryText>
						Already have an account?{' '}
						<Link href='/signin'>
							<strong>Sign in now</strong>
						</Link>
					</SecondaryText>
				</Flex>
				{/* if has cutomer value */}
			</div>
		</div>
	);
};

export default Customer;
