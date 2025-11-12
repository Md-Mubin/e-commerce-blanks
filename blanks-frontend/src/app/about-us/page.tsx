import { Flex, Layout, SectionTitleText } from '@/components';
import SecondaryText from '@/components/reusables/SecondaryText';
import { aboutUsData } from '@/lib/staticPageData';
import Link from 'next/link';
import React from 'react';

const page = () => {
	return (
		<Layout>
			<section className='bg-white text-gray-800'>
				<div className='max-w-5xl mx-auto px-6 py-2 lg:py-8'>
					{/* Heading */}
					<SectionTitleText className='border-b-4 border-primaryColor inline-block pb-1'>
						{aboutUsData?.pageTitle}
					</SectionTitleText>

					<Flex className='flex-col gap-2 w-full mt-[24px]'>
						{/* Intro Paragraphs */}
						{aboutUsData?.introParagraphs?.map((para, idx) => (
							<SecondaryText key={idx} className='leading-relaxed mb-6'>
								{para}
							</SecondaryText>
						))}
					</Flex>

					{/* Mission Section */}
					<div className='bg-gray-50 p-4 md:p-8 rounded-sm shadow-sm'>
						<SectionTitleText className='inline-block pb-4'>
							{aboutUsData?.missionTitle}
						</SectionTitleText>
						<SecondaryText className='leading-relaxed mb-6'>
							{aboutUsData?.missionIntro}
						</SecondaryText>

						{/* Mission Points */}
						<ul className='space-y-4'>
							{aboutUsData?.missionPoints?.map((point, idx) => (
								<li key={idx} className='flex items-start'>
									<span className='text-black text-xl mr-3'>•</span>
									<SecondaryText>
										<span className='font-semibold'>{point?.title}</span> –{' '}
										{point?.description}
									</SecondaryText>
								</li>
							))}
						</ul>

						{/* Closing Line */}
						<SecondaryText className='leading-relaxed mt-6'>
							{aboutUsData?.missionClosing}
						</SecondaryText>
					</div>

					{/* Link */}
					<div className='mt-10 text-center flex items-center justify-center gap-2'>
						{aboutUsData?.ctaText}
						<Link
							href={aboutUsData?.ctaLink?.url}
							target='_blank'
							className='font-semibold inline-block border-b pb-[1px]'
						>
							{aboutUsData?.ctaLink?.label}
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default page;
