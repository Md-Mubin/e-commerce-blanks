import { Layout, PrimaryText, SectionTitleText } from '@/components';
import SecondaryText from '@/components/reusables/SecondaryText';
import React from 'react';

const page = () => {
	return (
		<Layout>
			<section className='bg-white text-gray-800'>
				<div className='max-w-5xl mx-auto px-6 py-2 lg:py-8 text-center'>
					{/* Page Heading */}
					<SectionTitleText className='border-b-4 border-primaryColor inline-block pb-1 mb-8'>
						Contact Us
					</SectionTitleText>

					{/* Intro Text */}
					<SecondaryText className='leading-relaxed max-w-2xl mx-auto mb-10'>
						Need to get in contact with us? Our friendly customer service team
						in Vancouver is available to help{' '}
						<span className='font-semibold'>Monday to Friday</span> from{' '}
						<span className='font-semibold'>8 AM - 4 PM Pacific Time</span>.
						<br />
						Please note, we are closed on weekends and all statutory holidays.
					</SecondaryText>

					{/* Contact Info Cards */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto'>
						{/* Email */}
						<div className='bg-gray-50 p-6 rounded-md shadow-sm hover:shadow-md transition'>
							<div className='text-4xl mb-3'>📧</div>
							<SectionTitleText className='mb-2'>Email Us</SectionTitleText>
							<SecondaryText>info@blankbasic.ca</SecondaryText>
						</div>

						{/* Phone */}
						<div className='bg-gray-50 p-6 rounded-md shadow-sm hover:shadow-md transition'>
							<div className='text-4xl mb-3'>📞</div>
							<h2 className='text-xl font-semibold mb-2'>Call Us</h2>
							<SecondaryText>819-968-9939</SecondaryText>
						</div>
					</div>

					{/* Closing Line */}
					<SectionTitleText className='mt-10 text-[16px]'>{`We're here to help!`}</SectionTitleText>
				</div>
			</section>
		</Layout>
	);
};

export default page;
