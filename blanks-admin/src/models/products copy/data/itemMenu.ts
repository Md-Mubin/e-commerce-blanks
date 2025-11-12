import ListInventoryModal from '@/components/library/components/modals/products/ListInventoryModal';
import schema from '../product.schema';
import { convertToViewFields, MenuItemProps } from '@/components/library';

const itemMenu: MenuItemProps[] = [
	{
		title: 'Edit',
		type: 'edit',
	},
	// {
	// 	title: 'Details',
	// 	type: 'redirect',
	// 	href: '/go/details',
	// },
	{
		title: 'View',
		type: 'view-modal',
		dataModel: convertToViewFields({ schema }),
	},
	{
		title: 'Stock Details',
		type: 'custom',
		modal: ListInventoryModal,
	},
	{
		title: 'Make Copy',
		type: 'duplicate',
	},
	{
		title: 'Publish Product',
		type: 'update-api',
		body: {
			status: 'published',
		},
		prompt: {
			title: 'Publish Product',
			body: 'Are you sure you want to publish this product?',
			successMsg: 'Product Published Successfully',
		},
		renderCondition: (data: any) => data.status == 'draft',
	},
	{
		title: 'Unpublish Product',
		type: 'update-api',
		body: {
			status: 'draft',
		},
		prompt: {
			title: 'Mark Product as Draft',
			body: 'Are you sure you want to unpublish this product from website? it will not be visible to customers',
			successMsg: 'Product Unpublished',
		},
		renderCondition: (data: any) => data.status == 'published',
	},
	// {
	// 	title: 'Custom',
	// 	type: 'custom-modal',
	// 	modal: CustomModal,
	// },
];

export default itemMenu;
