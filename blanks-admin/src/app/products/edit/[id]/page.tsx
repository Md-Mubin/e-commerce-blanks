'use client';
import React from 'react';
import { EditItemPage } from '@/components/library';
//import { edit } from '@/models/products';

import { updateForm as edit } from '@/models/products/products.model';

const UpdateProductPage = () => {
	return <EditItemPage data={edit} />;
};

export default UpdateProductPage;
