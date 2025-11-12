'use client';
import React from 'react';
import { NextPage } from 'next';
import data from '@/models/customers/viewAllCustomers';
import { PageTable } from '@/components/library';

const page: NextPage = () => {
	return <PageTable table={data} />;
};

export default page;
