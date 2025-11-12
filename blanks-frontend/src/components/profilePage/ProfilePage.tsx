"use client";
import React from 'react';
import { ProfileInfo, ProfileUserOrders } from './index';
import { useGetSelfQuery } from '@/store/services/authApi';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
	const router = useRouter()
	const { data: userData, isFetching } = useGetSelfQuery({});
	// console.log('isFetching', isFetching);
	if (!isFetching && !userData) {
		router.push('/signin')
	}
	// console.log('user data self:', userData);
	return (
		userData && (
			<section className='max-w-7xl m-auto py-10 px-4'>
				{/* Profile Section */}
				<ProfileInfo />

				{/* Order History Section */}
				< ProfileUserOrders id={userData?._id} />
			</section>
		)
	);
};

export default ProfilePage;
