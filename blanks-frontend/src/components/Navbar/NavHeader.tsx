import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { Flex, PrimaryText } from '../reusables';
import SecondaryText from '../reusables/SecondaryText';
import Link from 'next/link';
import { RiFacebookFill } from 'react-icons/ri';
import { SlSocialInstagram, SlSocialLinkedin } from 'react-icons/sl';
import { TfiTwitter } from 'react-icons/tfi';
import { useGetSelfQuery } from '@/store/services/authApi';
import { useAuth } from '@/hooks/useAuth';

const socialLinks = [
	{ name: 'Facebook', href: '#', icon: RiFacebookFill },
	{ name: 'Instagram', href: '#', icon: SlSocialInstagram },
	{ name: 'Twitter', href: '#', icon: TfiTwitter },
	{ name: 'LinkedIn', href: '#', icon: SlSocialLinkedin },
];
const NavHeader = () => {
	const { data: userData, isFetching } = useGetSelfQuery({});
	const { isLoggedIn } = useAuth();

	return (
		<Flex className='grid grid-cols-3 items-center w-full'>
			<div className='flex gap-4'>
				{socialLinks?.map((link, index) => (
					<Link
						href={link?.href}
						key={index}
						className='text-primaryColor hover:text-secondaryColor'>
						<link.icon className='w-[16px] h-[16px]' />
					</Link>
				))}
			</div>

			<SecondaryText className='justify-self-center tracking-[2px]'>
				Welcome to <strong>BLANK BASIC</strong> !
			</SecondaryText>
			<Flex className='justify-self-end items-center gap-2'>
				{isLoggedIn ? (
					<Link
						href='/profile'
						className='cursor-pointer flex items-center gap-2'>
						<>
							<FaUser className='text-secondaryColor text-[13px]' />
							<PrimaryText className='text-secondaryColor font-normal'>
								{userData?.name}
							</PrimaryText>
						</>
					</Link>
				) : (
					<Flex className='items-center gap-2'>
						<Link
							href='/signin'
							className='cursor-pointer'>
							<PrimaryText className='text-secondaryColor'>Sign In</PrimaryText>
						</Link>
						<span>/</span>
						<Link
							href='/signup'
							className='cursor-pointer'>
							<PrimaryText className='text-secondaryColor'>Register</PrimaryText>
						</Link>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default NavHeader;
