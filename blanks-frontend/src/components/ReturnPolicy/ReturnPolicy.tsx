import React from 'react';
import { SectionTitleText } from '../reusables';
import { Layout } from '../Layout';
import SecondaryText from '../reusables/SecondaryText';
import { returnPolicyData } from '@/lib/staticPageData';

const ReturnPolicy = () => {
	return (
		<Layout>
			<section className='bg-white text-gray-800'>
				<div className='max-w-5xl mx-auto px-6 py-2 lg:py-8'>
					{/* Page Heading */}
					<SectionTitleText className='border-b-4 border-primaryColor inline-block pb-1 mb-8'>
						{returnPolicyData?.pageTitle}
					</SectionTitleText>
					<div className='mb-8'>
						<SectionTitleText>
							{returnPolicyData?.returnsRefund?.title}
						</SectionTitleText>
						<SecondaryText>
							{returnPolicyData?.returnsRefund?.description}
						</SecondaryText>
					</div>
					{/* Sections */}
					{returnPolicyData?.sections?.map((section, index) => (
						<div key={index} className='mb-12'>
							<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
								{section.title}
							</SectionTitleText>

							{/* Ordered list */}
							{section?.type === 'ordered' && (
								<>
									<ol className='list-decimal pl-6 space-y-2'>
										{section?.items?.map((item, idx) => (
											<li key={idx}>
												<SecondaryText>{item}</SecondaryText>
											</li>
										))}
									</ol>
									{section?.note && (
										<SecondaryText className='mt-3'>
											{section?.note}
										</SecondaryText>
									)}
								</>
							)}

							{/* Unordered list */}
							{section?.type === 'unordered' && (
								<ul className='list-disc pl-6 space-y-2'>
									{section?.items?.map((item, idx) => (
										<li key={idx}>
											<SecondaryText>{item}</SecondaryText>
										</li>
									))}
								</ul>
							)}

							{/* Paragraphs */}
							{section?.type === 'paragraphs' && (
								<>
									{section?.paragraphs?.map((para, idx) => (
										<SecondaryText key={idx} className='mb-2'>
											{para}
										</SecondaryText>
									))}
								</>
							)}

							{/* Paragraphs with list */}
							{section?.type === 'paragraphsWithList' && (
								<>
									{section?.paragraphs?.map((para, idx) => (
										<SecondaryText key={idx} className='mb-3'>
											{para}
										</SecondaryText>
									))}
									<ul className='list-disc pl-6 space-y-2'>
										{section?.list?.map((item, idx) => (
											<li key={idx}>
												<SecondaryText>{item}</SecondaryText>
											</li>
										))}
									</ul>
									{section?.closing?.map((text, idx) => (
										<SecondaryText key={idx} className='mt-4'>
											{text}
										</SecondaryText>
									))}
								</>
							)}
						</div>
					))}
				</div>
			</section>
		</Layout>
	);
};

export default ReturnPolicy;
