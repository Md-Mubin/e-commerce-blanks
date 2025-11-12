import { SchemaType } from '@/components/library';

type CouponType = {
	name: string;
	description?: string;
	code: string;
	isActive: boolean;
	isFlat: boolean;
	maxAmount: number;
	minOrderValue: number;
	validFrom: Date;
	validTill: Date;
	maxUse: number;
	percentage: number;
	image?: string;
	maxUsePerUser?: number;
};

const schema: SchemaType<CouponType> = {
	name: {
		label: 'Name',
		type: 'text',
		sort: true,
		default: true,
		displayInTable: true,
		isRequired: true,
	},
	description: {
		label: 'Description',
		type: 'textarea',
	},
	code: {
		label: 'Code',
		type: 'text',
		sort: true,
		default: true,
		displayInTable: true,
		isRequired: true,
	},
	isActive: {
		label: 'Active',
		type: 'checkbox',
		sort: true,
		default: true,
		displayInTable: true,
		colorScheme: (data: any) => (data ? 'green' : 'red'),
	},

	isFlat: {
		label: 'Is Flat',
		type: 'checkbox',
		sort: true,
		default: true,
		displayInTable: true,
		colorScheme: (data: any) => (data ? 'purple' : 'blue'),
	},
	maxAmount: {
		label: 'Max Amount',
		type: 'number',
		sort: true,
		default: true,
		displayInTable: true,
		isRequired: true,
	},

	minOrderValue: {
		label: 'Min Order Value',
		type: 'number',
		sort: true,
		displayInTable: true,
		isRequired: true,
	},

	validFrom: {
		label: 'Valid From',
		type: 'date',
		sort: true,
		displayInTable: true,
		isRequired: true,
	},

	validTill: {
		label: 'Valid Till',
		type: 'date',
		sort: true,
		displayInTable: true,
		isRequired: true,
	},

	percentage: {
		label: 'Percentage',
		type: 'number',
		sort: true,
		displayInTable: true,
		isRequired: true,
		renderCondition: (data: any) => data?.isFlat == false,
	},
	maxUse: {
		label: 'Max Use',
		type: 'number',
		sort: true,
		displayInTable: true,
		isRequired: true,
	},
};

export default schema;
