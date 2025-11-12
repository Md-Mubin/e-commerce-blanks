'use client';
import React, { useState } from 'react';
import {
	Layout,
	useGetByIdQuery,
	useIsMobile,
	Column,
	VInput,
	VSelect,
	VTextarea,
	TabularDetail as ReturnItem,
	sizes,
	usePostMutation,
	useRedirect,
} from '@/components/library';
import { useParams } from 'next/navigation';
import { Grid, Text, Table, Thead, Tbody, Th, TableContainer, Button } from '@chakra-ui/react';

import { Tr, ReturnProduct } from '@/components/library';

const RESONS_OPTIONS = [
	{
		value: 'defective',
		label: 'Defective',
	},
	{
		value: 'damaged',
		label: 'Damaged',
	},
	{
		value: 'customer-discontent',
		label: 'Customer Discontent',
	},
	{
		value: 'wrong',
		label: 'Wrong Item',
	},
	{
		value: 'other',
		label: 'Other',
	},
];

const CreateReturn = () => {
	const { id } = useParams();
	const { data, isFetching } = useGetByIdQuery({ path: 'orders', id: id }, { skip: !id });
	const isMobile = useIsMobile();
	const [formData, setFormData] = useState({
		invoice: '',
		customer: '',
		items: [],
		totalAmount: 0,
		reason: '',
		otherReason: '',
		reference: '',
		// order: id,
		date: new Date().toISOString(),
		tags: [],
		note: '',
	});

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const setItem = ({
		qty,
		item,
		returnAmount,
	}: {
		qty: number;
		item: any;
		returnAmount: number;
	}) => {
		if (!qty || qty == 0) {
			setFormData((prevFormData: any) => {
				const updatedItems = prevFormData.items.filter(
					(existingItem: any) => existingItem.id !== item.id
				);
				return { ...prevFormData, items: updatedItems };
			});
			return;
		}
		setFormData((prevFormData: any) => {
			const existingItemIndex = prevFormData.items.findIndex(
				(existingItem: any) => existingItem.id === item.id
			);

			if (existingItemIndex !== -1) {
				// Item exists, update the quantity
				const updatedItems = [...prevFormData.items];
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					qty: updatedItems[existingItemIndex].qty,
					returnQty: qty,
					returnAmount: returnAmount,
				};
				return { ...prevFormData, items: updatedItems };
			} else {
				// Item does not exist, add the item
				return {
					...prevFormData,
					items: [
						...prevFormData.items,
						{ ...item, returnQty: qty, returnAmount }, // Add new field here
					],
				};
			}
		});
	};

	const [trigger, result] = usePostMutation();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		trigger({
			invalidate: ['orders'],
			path: 'returns',
			body: {
				amount: formData.items.reduce((acc: number, item: any) => acc + item.returnAmount, 0),
				order: id,
				...formData,
			},
		});
	};

	useRedirect({ path: `/orders/${id}`, ...result });

	const basics = data && (
		<Grid
			boxShadow='md'
			borderRadius={sizes.RADIUS_MENU}
			gridTemplateColumns='1fr 1ft'
			bg='menu.light'
			_dark={{
				bg: 'menu.dark',
			}}>
			<ReturnItem heading='Invoice No.'>{data?.invoice}</ReturnItem>
			<ReturnItem heading='Customer'>
				{data?.customer ? data?.customer?.name : 'Walk-in Customer'}
			</ReturnItem>
			<ReturnItem heading='Product Price'>{data?.subTotal?.toLocaleString()}</ReturnItem>
			<ReturnItem heading='Vat'>{data?.vat?.toLocaleString()}</ReturnItem>
			<ReturnItem heading='Discount'>{data?.discount?.toLocaleString()}</ReturnItem>
			<ReturnItem heading='Paid'>{data?.paidAmount?.toLocaleString()}</ReturnItem>
			<ReturnItem heading='Total Receivable'>{data?.dueAmount?.toLocaleString()}</ReturnItem>
		</Grid>
	);

	const inputs = (
		<>
			<Grid
				gridTemplateColumns='1fr 1fr'
				gap={2}>
				<VInput
					isRequired={true}
					type='date'
					label='Return date'
					value={formData.date}
					name='date'
					onChange={handleChange}
				/>
				<VSelect
					isRequired={true}
					label='Reason'
					value={formData.reason}
					name='reason'
					onChange={handleChange}>
					<option value=''>Select Reason</option>
					{RESONS_OPTIONS.map(option => (
						<option
							key={option.value}
							value={option.value}>
							{option.label}
						</option>
					))}
				</VSelect>
			</Grid>

			<Grid
				gridTemplateColumns='1fr 1fr'
				gap={2}>
				<VInput
					label='Total Return Amount'
					value={formData.items.reduce(
						(acc: number, item: any) => acc + (item.returnAmount + item.unitVat * item.returnQty),
						0
					)}
					name='reference'
					isReadOnly={true}
				/>

				<VInput
					label='Reference'
					value={formData.reference}
					name='reference'
					onChange={handleChange}
				/>
			</Grid>

			{formData?.reason == 'other' && (
				<VTextarea
					isRequired={true}
					label='Other Reason'
					value={formData.otherReason}
					name='otherReason'
					onChange={handleChange}
				/>
			)}

			<VTextarea
				label='Note'
				value={formData.note}
				name='note'
				onChange={handleChange}
			/>
			{/* <p>{result?.isError ? 'Error' : result?.isSuccess && 'Success'}</p> */}
			<Button
				isLoading={result.isLoading}
				colorScheme='brand'
				type='submit'
				size='md'>
				Return
			</Button>
		</>
	);

	const table = (
		<Table size='sm'>
			<Thead {...(isMobile && { display: 'none' })}>
				<Tr>
					<Th>#</Th>
					<Th>Product Name</Th>
					<Th isNumeric>Unit Price</Th>
					<Th isNumeric>Sell Qty</Th>
					<Th isNumeric>Return Qty</Th>
					<Th isNumeric>Return SubTotal</Th>
				</Tr>
			</Thead>

			<Tbody>
				{data?.items?.map((item: any, i: number) => (
					<ReturnProduct
						key={i}
						item={item}
						i={i}
						setItem={setItem}
					/>
				))}
			</Tbody>
		</Table>
	);

	return (
		<Layout
			title='Sale Return'
			path='returns'>
			<form onSubmit={handleSubmit}>
				<Column gap={4}>
					<TableContainer
						p={{ base: 0, md: 4 }}
						borderRadius={sizes.RADIUS_MENU}
						boxShadow={{ base: 'none', md: 'md' }}
						borderWidth={{ base: 0, md: 1 }}>
						{table}
					</TableContainer>
					<Grid
						gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
						gap={4}>
						{basics}

						<Column
							boxShadow='md'
							bg='menu.light'
							_dark={{
								bg: 'menu.dark',
							}}
							borderRadius={sizes.RADIUS_MENU}
							gap={4}
							borderWidth={1}
							p={4}>
							{inputs}
						</Column>
					</Grid>
				</Column>
			</form>
		</Layout>
	);
};

export default CreateReturn;
