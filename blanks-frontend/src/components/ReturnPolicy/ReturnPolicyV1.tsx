import React from 'react';
import { SectionTitleText } from '../reusables';
import { Layout } from '../Layout';
import SecondaryText from '../reusables/SecondaryText';

const ReturnPolicy = () => {
	return (
		<Layout>
			<section className='bg-white text-gray-800'>
				<div className='max-w-5xl mx-auto px-6 py-2 lg:py-8'>
					{/* Page Heading */}

					<SectionTitleText className='border-b-4 border-primaryColor inline-block pb-1 mb-8'>
						Returns &amp; Exchanges
					</SectionTitleText>

					{/* How to Start a Return */}
					<div className='mb-12'>
						<SectionTitleText className='text-[18px] font-semibold text-black mb-2'>
							How to Start a Return
						</SectionTitleText>
						<ol className='list-decimal pl-6 space-y-2'>
							<li>
								<SecondaryText>
									Sign into your account at{' '}
									<span className='font-semibold'>Blankbasic</span>.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>Go to your Order History.</SecondaryText>
							</li>
							<li>
								<SecondaryText>{`Find the order you'd like to return and click “Return items?”`}</SecondaryText>
							</li>
							<li>
								<SecondaryText>{`Select the item(s) and quantity you'd like to return.`}</SecondaryText>
							</li>
							<li>
								<SecondaryText>Choose a return reason.</SecondaryText>
							</li>
							<li>
								<SecondaryText>Submit your return request.</SecondaryText>
							</li>
						</ol>
						<SecondaryText className='mt-3'>
							Once we receive your request, we’ll email you detailed return
							instructions.
						</SecondaryText>
					</div>

					{/* Return Requirements */}
					<div className='mb-12'>
						<SectionTitleText className='text-[18px] font-semibold text-black mb-2'>
							Return Requirements
						</SectionTitleText>
						<ul className='list-disc pl-6 space-y-2'>
							<li>
								<SecondaryText>
									Returns must be initiated within 30 days of the order date.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Returns must be authorized by Blankbasic.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									A Return Authorization (RA) number is required — returns
									without an RA will be refused.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Items that have been altered, washed, or worn are
									non-returnable.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Shipping and handling fees are non-refundable.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Return shipping is the customer’s responsibility.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Returns must be sent via courier — local drop-offs are not
									accepted.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Defective, damaged, or lost item claims must be submitted
									within 10 days of purchase.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Some returns may be subject to a restocking fee.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Please allow 5–7 business days for refunds to be processed
									after your item arrives at our warehouse.
								</SecondaryText>
							</li>
						</ul>
					</div>

					{/* Exchanges */}
					<div className='mb-12'>
						<SectionTitleText className='text-[18px] font-semibold text-black mb-2'>
							Exchanges
						</SectionTitleText>
						<SecondaryText className='mb-2'>{`We do not offer direct exchanges at this time. However, you're
						welcome to return your item(s) and place a new order at your
						convenience.`}</SecondaryText>

						<SecondaryText>
							{`If you'd like to proceed, please review our return process and
						follow the instructions provided to ensure your return qualifies.`}
						</SecondaryText>
					</div>

					{/* Return to Sender */}
					<div className='mb-12'>
						<SectionTitleText className='text-[18px] font-semibold text-black mb-2'>
							Return to Sender
						</SectionTitleText>
						<SecondaryText>
							Orders returned to sender (e.g., undeliverable or refused
							shipments) may be subject to a restocking fee.
						</SecondaryText>
					</div>

					{/* Cancellations */}
					<div className='mb-12'>
						<SectionTitleText className='text-[18px] font-semibold text-black mb-2'>
							Cancellations
						</SectionTitleText>
						<ul className='list-disc pl-6 space-y-2'>
							<li>
								<SecondaryText>
									Once an order is submitted and sent to our warehouse for
									processing, it cannot be cancelled or modified — even outside
									of business hours.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Processing begins within 10 minutes of placing your order.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Please double-check your order details before submitting.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Once your order ships, our return policy applies.
								</SecondaryText>
							</li>
						</ul>
					</div>

					{/* Damaged or Missing Items */}
					<div>
						<SectionTitleText className='text-[18px] font-semibold text-black mb-2'>
							Damaged, Defective, or Missing Items
						</SectionTitleText>
						<SecondaryText className='mb-3'>
							If your order arrives with any missing, damaged, or defective
							item(s), please contact us right away so we can investigate and
							resolve the issue as quickly as possible.
						</SecondaryText>
						<SecondaryText className='mb-3'>
							Please include the following in your message:
						</SecondaryText>
						<ul className='list-disc pl-6 space-y-2'>
							<li>
								<SecondaryText> Your order number</SecondaryText>
							</li>
							<li>
								<SecondaryText>Your full name</SecondaryText>
							</li>
							<li>
								<SecondaryText>Your phone number</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									A list of the item(s) that are missing, damaged, or defective
								</SecondaryText>
							</li>
						</ul>
						<SecondaryText className='mt-4'>
							Important: Claims must be submitted within 10 days of the purchase
							date. Some cases may require further investigation, which can take
							up to 3 business days.
						</SecondaryText>
						<SecondaryText className='mt-4'>
							For full details, please refer to our Returns Policy.
						</SecondaryText>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default ReturnPolicy;
