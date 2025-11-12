'use client';

//import formTable from '@/models/products/createProduct.model';
import { AddItemPage } from '@/components/library';
import { formTable } from '@/models/products/products.model';

const CreateItemsPage = () => {
	return <AddItemPage data={formTable} />;
};

export default CreateItemsPage;
