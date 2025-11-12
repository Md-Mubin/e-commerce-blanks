'use client';

import React from 'react';
import { NextPage } from 'next';
import { PageTable } from '@/components/library';
import { collections } from '@/models';

const { getAll } = collections;

const page: NextPage = () => {
	return <PageTable table={getAll} />;
};

export default page;
