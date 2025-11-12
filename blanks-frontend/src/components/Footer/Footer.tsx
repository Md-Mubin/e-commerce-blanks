'use client';

import React from 'react';
import Container from '../reusables/Container';
import { Box, Center, Flex, Grid, SectionTitleText } from '../reusables';
import Link from 'next/link';
import { MdOutlineLocationOn } from 'react-icons/md';
import Image from 'next/image';
import { footerData } from '@/lib/footerData';
import SecondaryText from '../reusables/SecondaryText';

const Footer = () => {
	return (
		<Box className='bg-bodyColor text-primaryColor py-12'>
			<Container className=''>
				<Flex className='justify-between flex-col items-start md:flex-row gap-8'>
					{/* Company Info */}
					<Box>
						<Link href='/'>
							<Image
								src={footerData?.companyInfo?.logo}
								width={0}
								height={0}
								sizes='(max-width: 268px)'
								alt='logo image'
								className='w-auto h-[80px] object-contain mb-8'
							/>
						</Link>
						<Flex className='mt-4 gap-2 items-start'>
							<MdOutlineLocationOn className='text-xl -ml-1' />
							<SecondaryText className='max-w-[275px]'>
								{footerData?.companyInfo?.address}
							</SecondaryText>
						</Flex>
						<div className='flex space-x-4 mt-4'>
							{footerData?.socialLinks.map((link, index) => (
								<a
									key={index}
									href={link?.href}
									target='_blank'
									rel='noopener noreferrer'
									className='text-primaryColor hover:text-secondaryColor'
								>
									<link.icon className='w-5 h-5' />
								</a>
							))}
						</div>
					</Box>

					{/* Navigate */}
					<Flex>
						{footerData?.sections?.map((section, index) => (
							<div key={index}>
								<SectionTitleText className='mb-4 uppercase'>
									{section?.title}
								</SectionTitleText>
								<ul className='space-y-2'>
									{section?.links?.map((link, i) => {
										// const href =
										// 	link?.href === 'all-properties'
										// 		? '/all-properties'
										// 		: `/all-properties?propertyStatus=${link?.href}`;
										return (
											<li key={i}>
												<Link href={link?.href} className='hover:underline'>
													<SecondaryText className='text-primaryColor hover:text-secondaryColor'>{link?.label}</SecondaryText>
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						))}
					</Flex>
					{/* categories */}
					<Flex>
						{footerData?.categories?.map((section, index) => (
							<div key={index}>
								<SectionTitleText className='mb-4 uppercase'>
									{section?.title}
								</SectionTitleText>
								<ul className='space-y-2'>
									{section?.links?.map((link, i) => {
										// const href =
										// 	link?.href === 'all-properties'
										// 		? '/all-properties'
										// 		: `/all-properties?propertyStatus=${link?.href}`;
										return (
											<li key={i}>
												<Link href={link?.href} className='hover:underline'>
													<SecondaryText className='text-primaryColor hover:text-secondaryColor'>{link?.label}</SecondaryText>
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						))}
					</Flex>
					{/* popularBarnds */}
					<Flex>
						{footerData?.popularBarnds?.map((section, index) => (
							<div key={index}>
								<SectionTitleText className='mb-4 uppercase'>
									{section?.title}
								</SectionTitleText>
								<ul className='space-y-2'>
									{section?.links?.map((link, i) => {
										// const href =
										// 	link?.href === 'all-properties'
										// 		? '/all-properties'
										// 		: `/all-properties?propertyStatus=${link?.href}`;
										return (
											<li key={i}>
												<Link href={link?.href} className='hover:underline'>
													<SecondaryText className='text-primaryColor hover:text-secondaryColor'>{link?.label}</SecondaryText>
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						))}
					</Flex>
				</Flex>

				{/* Bottom Links & Copyright */}
				{/* <Column className='mt-8 border-t border-borderBg pt-4 text-primaryBg md:flex-row justify-between text-sm'>
					<div>{footerData?.copyright}</div>
					<Flex className='space-x-4 mb-4 md:mb-0'>
						{footerData?.bottomLinks?.map((link, index) => (
							<Link key={index} href={link?.href} className='hover:underline'>
								{link?.label}
							</Link>
						))}
					</Flex>
				</Column> */}
			</Container>
		</Box>
	);
};

export default Footer;
