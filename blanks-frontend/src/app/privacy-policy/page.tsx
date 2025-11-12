import { Layout, SectionTitleText } from '@/components';
import SecondaryText from '@/components/reusables/SecondaryText';
import { privacyPolicyData } from '@/lib/staticPageData';
import React from 'react';

const page = () => {
	return (
		<Layout>
			<section className='bg-white'>
				<div className='max-w-5xl mx-auto px-6 py-2 lg:py-12'>
					{/* Page Title */}
					<SectionTitleText className='border-b-4 border-primaryColor inline-block pb-1 mb-8'>
						Privacy Policy
					</SectionTitleText>

					{/* Intro */}
					<SecondaryText className='leading-relaxed mb-8'>
						At <span className='font-semibold'>Blankbasic</span>, your privacy
						is important to us. This policy explains what information we
						collect, how we use it, and the measures we take to protect it.
					</SecondaryText>

					{/* Sections */}
					<div className='space-y-10'>
						{privacyPolicyData?.sections?.map((policy: any, index: number) => (
							<div key={index}>
								<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
									{policy?.heading}
								</SectionTitleText>
								<SecondaryText className='leading-relaxed'>
									{policy?.content}
								</SecondaryText>
							</div>
						))}
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default page;
