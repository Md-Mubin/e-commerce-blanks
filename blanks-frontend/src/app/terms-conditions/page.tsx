import { Layout, SectionTitleText } from '@/components';
import SecondaryText from '@/components/reusables/SecondaryText';
import { termsData } from '@/lib/staticPageData';
import React from 'react';

const TermsAndConditions = () => {
	return (
		<Layout>
			<div className='bg-white'>
				<div className='max-w-5xl mx-auto px-6 py-2 lg:py-12'>
					<SectionTitleText className='border-b-4 border-primaryColor inline-block pb-1 mb-8'>
						{termsData.title}
					</SectionTitleText>
					<SecondaryText className='mb-4'>
						Last Updated: {termsData.lastUpdated}
					</SecondaryText>

					<div className='space-y-8'>
						{termsData?.sections?.map((section: any, index: number) => (
							<div key={index}>
								<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
									{section?.heading}
								</SectionTitleText>
								<SecondaryText className='leading-relaxed'>
									{section?.content}
								</SecondaryText>

								{/* {index < termsData.sections.length - 1 && (
							<div className='my-4 border-t border-secondaryBorder'></div>
						)} */}
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default TermsAndConditions;
