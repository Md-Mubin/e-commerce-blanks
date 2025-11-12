import { Layout, SectionTitleText } from '@/components';
import SecondaryText from '@/components/reusables/SecondaryText';
import React from 'react';

const page = () => {
	return (
		<Layout>
			<section className='bg-white'>
				<div className='max-w-5xl mx-auto px-6 py-2 lg:py-12'>
					{/* Shipping Information */}
					<div className='mb-12'>
						<SectionTitleText className='border-b-4 border-primaryColor inline-block pb-1 mb-8'>
							Shipping Information
						</SectionTitleText>
						{/* Shipping Rates */}
						<div className='mb-6'>
							<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
								Shipping Rates
							</SectionTitleText>
							<ul className='list-disc pl-6 space-y-2'>
								<li>
									<SecondaryText>
										Shipping starts at{' '}
										<span className='font-semibold'>$12.50</span>, calculated
										based on weight and destination.
									</SecondaryText>
								</li>
								<li>
									<SecondaryText>
										For an exact quote, add items to your cart and enter your
										postal code at checkout.
									</SecondaryText>
								</li>
								<li>
									<SecondaryText>
										Free shipping on orders over{' '}
										<span className='font-semibold'>$500</span> before tax (some
										exclusions apply).
									</SecondaryText>
								</li>
								<li>
									<SecondaryText>
										Free shipping is not available for remote regions, including
										Yukon, Northwest Territories, and Nunavut.
									</SecondaryText>
								</li>
							</ul>
						</div>
						{/* CARRIERS */}
						<div className='mb-6'>
							<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
								Carriers
							</SectionTitleText>
							<ul className='list-disc pl-6 space-y-1'>
								<li>
									<SecondaryText>Purolator</SecondaryText>
								</li>
								<li>
									<SecondaryText>UPS</SecondaryText>
								</li>
								<li>
									<SecondaryText>Canada Post</SecondaryText>
								</li>
								<li>
									<SecondaryText>DHL</SecondaryText>
								</li>
							</ul>
							<SecondaryText className='mt-1'>
								Note: Orders may ship from multiple warehouses, which could lead
								to longer delivery times or additional charges.
							</SecondaryText>
						</div>

						{/* Large Shipments */}
						<div className='mb-6'>
							<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
								Large Shipments
							</SectionTitleText>

							<ul className='list-disc pl-6 space-y-2'>
								<li>
									<SecondaryText>
										Orders over <span className='font-semibold'>500 lbs</span>
										(approx. 1,000 T-shirts) will ship via freight forwarder.
									</SecondaryText>
								</li>
								<li>
									<SecondaryText>
										For express delivery on large orders, we recommend placing
										separate smaller orders.
									</SecondaryText>
								</li>
							</ul>
						</div>
					</div>

					{/* Shipping Restrictions */}
					<div className='mb-12'>
						<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
							Shipping Restrictions
						</SectionTitleText>

						<ul className='list-disc pl-6 space-y-2'>
							<li>
								<SecondaryText>
									Once processing begins, shipping methods cannot be changed.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									We do not ship to PO boxes or outside of Canada.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									Same-day delivery is not available.
								</SecondaryText>
							</li>
							<li>
								<SecondaryText>
									If your address is not serviced by Purolator or UPS, we will
									email you a custom shipping quote.
								</SecondaryText>
							</li>
						</ul>
					</div>

					{/* Order Notes */}
					<div className='mb-12'>
						<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
							Order Notes
						</SectionTitleText>
						<SecondaryText className='mb-3'>
							Any notes added during checkout may require manual review, which
							could delay processing — especially outside of regular business
							hours.
						</SecondaryText>
						<SecondaryText>
							Delivery requests (such as calling before arrival) cannot be
							guaranteed, as courier services do not accommodate special
							instructions.
						</SecondaryText>
					</div>

					{/* Tracking Your Order */}
					<div className='mb-12'>
						<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
							Tracking Your Order
						</SectionTitleText>
						<SecondaryText className='mb-3'>
							Tracking details will be emailed to you once your order has
							shipped.
						</SecondaryText>
						<SecondaryText>
							{`Didn't receive it? Please check your spam/junk folder, and if
							still missing, feel free to contact us directly.`}
						</SecondaryText>
					</div>

					{/* Order Pickup */}
					<div>
						<SectionTitleText className='text-[18px] font-semibold text-primaryColor mb-2'>
							Order Pickup
						</SectionTitleText>
						<SecondaryText>
							Warehouse pickups are not available. All orders are shipped
							directly to your chosen address.
						</SecondaryText>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default page;
