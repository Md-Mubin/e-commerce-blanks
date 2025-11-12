import { InputData } from '@/components/library';

type FormDataType = {
	image: string | undefined;
	name: string | undefined;
	description: string | undefined;
	precedence: number | undefined;
};

const createCollection: InputData<FormDataType>[] = [
	{
		sectionTitle: 'Collection Details',
		name: 'image',
		label: 'Image',
		isRequired: false,
		type: 'image',
	},
	{
		name: 'name',
		label: 'Collection Title',
		isRequired: true,
		type: 'text',
		endOfSection: true,
	},
	// {
	// 	name: 'dataKey',
	// 	label: 'Collection Key',
	// 	isRequired: true,
	// 	type: 'text',
	// },
	{
		name: 'priority',
		label: 'Collection Priority',
		isRequired: true,
		type: 'number',
	},
	{
		name: 'description',
		label: 'Collection description',
		isRequired: false,
		type: 'textarea',
		endOfSection: true,
	},
	{
		sectionTitle: 'Collection Images',
		name: 'images',
		label: 'Images',
		isRequired: false,
		type: 'image-array',
		endOfSection: true,
	},
	{
		sectionTitle: 'Display Settings',
		name: 'isFeatured',
		label: 'Is Featured?',
		isRequired: false,
		type: 'checkbox',
	},
	{
		name: 'displayInHome',
		label: 'Display In Home Page?',
		isRequired: false,
		type: 'checkbox',
	},
	{
		name: 'displayInMenu',
		label: 'Display In Menu/Sidebar?',
		isRequired: false,
		type: 'checkbox',
		endOfSection: true,
	},
	{
		sectionTitle: 'SEO Settings',
		name: 'metaImage',
		label: 'Image',
		type: 'image',
	},
	{
		name: 'meta.title',
		label: 'Title',
		type: 'text',
	},
	{
		name: 'meta.description',
		label: 'Description',
		type: 'textarea',
	},
	{
		name: 'metaKeywords',
		label: 'Meta Keywords',
		type: 'tag',
		endOfSection: true,
	},
];

export default createCollection;
