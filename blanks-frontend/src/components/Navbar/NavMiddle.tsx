'use client';
import { Flex, TextBase } from '../reusables';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline } from 'react-icons/io5';
import { GoHistory } from 'react-icons/go';
import { PiShoppingCartLight } from 'react-icons/pi';
import SecondaryText from '../reusables/SecondaryText';
import { CartModal } from '../CartModal';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { hideCartModal, toggleCartModal } from '@/store/slices/uiSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import RecentViews from './RecentViews';
const NavMiddle = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const showCart = useSelector((state: any) => state.ui.showCartModal);

	useEffect(() => {
		dispatch(hideCartModal());
	}, [router]);

	return (
		<Flex className='gap-[40px] lg:gap-[100px] xl:gap-[180px] items-center'>
			<div className='h-[65px]'>
				{/* <img
					src='/logo.png'
					alt='logo-image'
					className='h-full object-contain'
				/> */}
				<Link href='/'>
					<Image
						src='/logo.png'
						width={0}
						height={0}
						sizes='(max-width: 768px)'
						alt='logo image'
						className='w-auto h-full object-contain'
					/>
				</Link>
			</div>

			<Flex className='h-full w-full gap-8 items-end'>
				<div className='grow relative'>
					<SearchBar />
					<div className='w-[55px] h-[42px] absolute top-0 right-[1px] bg-primaryColor group-focus-within:text-button text-2xl flex justify-center items-center cursor-pointer rounded-r-sm'>
						<IoSearchOutline className='text-white text-2xl' />
					</div>
				</div>

				<Flex className='items-end gap-8 relative'>
					<Flex className='items-end gap-2'>
						<GoHistory className='text-[38px] text-secondaryColor' />
						<Flex className='flex-col'>
							<RecentViews />
						</Flex>
					</Flex>
					<Flex
						className='cursor-pointer relative items-end gap-2'
						onClick={() => dispatch(toggleCartModal())}>
						<PiShoppingCartLight className='text-[38px] text-secondaryColor' />
						<TextBase className='text-secondaryColor'>Cart</TextBase>
					</Flex>
					{showCart && (
						<div className='absolute top-[54px] right-0 z-[99]'>
							<CartModal />
						</div>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default NavMiddle;
