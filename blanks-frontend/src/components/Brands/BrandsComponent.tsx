import React from 'react';
import { brandsData } from '../data/brandsData';
import { Grid, SectionHeading } from '../reusables';

const BrandsComponent = () => {
	return (
		<div className='min-h-screen bg-white'>
			{/* Breadcrumb */}
			<div className='px-4 py-3 text-sm text-gray-500'>
				<span className='hover:text-gray-700 cursor-pointer'>HOME</span>
				<span className='mx-2'>/</span>
				<span>ALL BRANDS</span>
			</div>

			{/* Main Content */}
			<div className='px-4 pb-8 max-w-7xl mx-auto'>
				<SectionHeading>Brands</SectionHeading>

				{/* Brands Grid */}
				<Grid className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-8'>
					{brandsData.map(brand => (
						<div key={brand.id} className='group cursor-pointer'>
							{/* Logo Container */}
							<div className='flex items-center justify-center h-12 mb-4'>
								<img
									src={brand.logo}
									alt={brand.name}
									className='h-full w-full object-contain filter'
									loading='lazy'
								/>
							</div>

							{/* Brand Name */}
							<div className='text-center'>
								<h3 className='text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300'>
									{brand.displayName}
								</h3>
							</div>
						</div>
					))}
				</Grid>
			</div>
		</div>
	);
};

export default BrandsComponent;
