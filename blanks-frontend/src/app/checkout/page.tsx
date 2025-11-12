import { Layout, ShippingFlows, SummaryCard } from '@/components';
import CheckoutPage from '@/components/Checkout/ShippingFlows/CheckoutPage';
import Container from '@/components/reusables/Container';
import React from 'react';

const page = () => {
	return (
		<Layout>
			<Container>
				<div className='grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 w-full mb-12'>
					{/* shipping flows */}
					<div>
						<CheckoutPage />
					</div>
					{/* <div>
						<ShippingFlows />
					</div> */}
					<div className='justify-self-end'>
						<SummaryCard />
						
					</div>
				</div>
			</Container>
		</Layout>
	);
};

export default page;
