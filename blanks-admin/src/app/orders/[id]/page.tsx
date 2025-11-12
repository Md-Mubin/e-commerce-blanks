'use client';
import React from 'react';
import {
	Layout,
	useGetByIdQuery,
	OrderItems,
	Column,
	Section,
	OrderListGrid,
	convertToFormFields,
	CreateModal,
	EditAddressWidget,
} from '@/components/library';
import { useParams } from 'next/navigation';
import { Button, Flex } from '@chakra-ui/react';
import {
	LeftSection,
	BasicDetails,
	OrderPayments,
	OrderDelivery,
	updateAddressModel,
} from './_components';
import { orderStatus } from '@/models/order/order.schema';

const updateForm = convertToFormFields({
	schema: {
		status: {
			label: 'Order Status',
			type: 'select',
			options: orderStatus,
		},
	},
	layout: [
		{
			sectionTitle: 'Update Order Status',
			fields: ['status'],
		},
	],
	type: 'update',
});

const OrderDetailPage = () => {
	const { id }: { id: string } = useParams();

	const { data, isFetching, isLoading } = useGetByIdQuery(
		{
			path: 'orders',
			id: id,
		},
		{
			skip: !id,
		}
	);

	if (!data || isLoading)
		return (
			<Layout
				title='Loading...'
				path='orders'>
				...
			</Layout>
		);

	return (
		<Layout
			title={`Invoice #${data?.invoice}`}
			path='orders'>
			<Column
				gap={{ base: 4, md: 12 }}
				pt={{ base: 2, md: 0 }}>
				<Section
					heading='Customer Details'
					rightComponent={
						<CreateModal
							path='orders'
							id={id}
							type='update'
							data={updateAddressModel}>
							<Button size='sm'>Update Address</Button>
						</CreateModal>
					}>
					<BasicDetails data={data} />
				</Section>
				{/* <Section heading='Delivery Details'> */}
				<OrderDelivery
					id={data?.delivery}
					order={id}
				/>
				{/* </Section> */}
				<Section
					mb={2}
					heading='Order Details'
					rightComponent={
						<CreateModal
							path='orders'
							id={id}
							type='update'
							data={updateForm}>
							<Button size='sm'>Update Order Status</Button>
						</CreateModal>
					}>
					<OrderListGrid>
						<Flex flexDirection='column'>
							<OrderItems data={data} />
						</Flex>
						<Column
							flex={1}
							gap={4}>
							<Column
								gap={2}
								flex={1}>
								<LeftSection data={data} />
							</Column>
						</Column>
					</OrderListGrid>
				</Section>

				<OrderPayments
					order={id}
					invoice={data?.invoice}
				/>
			</Column>
		</Layout>
	);
};

export default OrderDetailPage;
