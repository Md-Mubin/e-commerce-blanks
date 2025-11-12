'use client';
import React from 'react';
import { NextPage } from 'next';
import { PageTable } from '@/components/library';
import damageTable from '@/models/returns/return.schema';

const page: NextPage = () => {
	return <PageTable table={damageTable} />;
};

export default page;
