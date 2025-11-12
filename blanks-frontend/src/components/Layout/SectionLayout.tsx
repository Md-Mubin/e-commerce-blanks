'use client';
import React from 'react';
import { Flex, PrimaryText } from '../reusables';
import Container from '../reusables/Container';
import Sidebar from '../Sidebar/Sidebar';
import { Menu } from 'lucide-react';

const SectionLayout = ({ categoryData, children }: any) => {
	// const { data } = useGetAllQuery({
	// 	path: '/categories',
	// });

	// console.log(data?.doc);

	return (
		<Container>
			<div className='grid grid-cols-1 lg:grid-cols-[250px_minmax(375px,_1fr)] gap-y-12 gap-x-8'>
				<div className='hidden lg:block'>
					<Sidebar hoverable={false}>
						<Sidebar.MenuHeading>
							<PrimaryText className='uppercase'>Category</PrimaryText>
							{/* icon */}
							<Menu />
						</Sidebar.MenuHeading>
						<Sidebar.MenuItems
							data={categoryData}
							pagetype='category'
						/>
					</Sidebar>
					{/* another sidebar */}
					{/* <div className='mt-8'>
						<Sidebar>
							<Sidebar.MenuHeading>
								<PrimaryText className=' uppercase'>Popular Brands</PrimaryText>
							</Sidebar.MenuHeading>
							<Sidebar.MenuItems
								data={brandsData}
								pagetype='brand'
							/>
						</Sidebar>
					</div> */}
				</div>
				<div className=''>{children}</div>
			</div>
		</Container>
	);
};

export default SectionLayout;
