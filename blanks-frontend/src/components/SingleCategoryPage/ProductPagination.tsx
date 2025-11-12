'use client';
import React from 'react';
import SecondaryText from '../reusables/SecondaryText';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
	pagination: {
		page: number;
		totalPages: number;
		totalDocs: number;
		docsInPage: number;
		limit: number;
	};
	onPageChange: (newPage: number) => void;
};

const ProductPagination = ({ pagination, onPageChange }: PaginationProps) => {
	const { page, totalPages, totalDocs, docsInPage, limit } = pagination;

	const start = (page - 1) * limit + 1;
	const end = Math.min(page * limit, totalDocs);

	const handlePrev = () => {
		if (page > 1) onPageChange(page - 1);
	};
	const handleNext = () => {
		if (page < totalPages) onPageChange(page + 1);
	};

	return (
		<div className='flex justify-between items-center gap-4 my-4'>
			<SecondaryText>
				Items {start} to {end} of {totalDocs} total
			</SecondaryText>

			<div className='flex items-center gap-4 grow justify-end'>
				{/* Previous */}
				<div
					onClick={handlePrev}
					className={`flex items-center gap-1 cursor-pointer ${
						page <= 1 ? 'opacity-50 pointer-events-none' : ''
					}`}
				>
					<ChevronLeft className='w-[18px] h-[18px] text-primaryColor' />
					<SecondaryText>Previous</SecondaryText>
				</div>

				{/* Page Numbers */}
				<div className='flex items-center gap-2'>
					{Array.from({ length: totalPages }).map((_, i) => {
						const num = i + 1;
						return (
							<button
								key={num}
								onClick={() => onPageChange(num)}
								className={`px-2 border cursor-pointer ${
									num === page
										? 'border-primaryColor text-primaryColor font-semibold'
										: 'border-secondaryBorder'
								}`}
							>
								{num}
							</button>
						);
					})}
				</div>

				{/* Next */}
				<div
					onClick={handleNext}
					className={`flex items-center gap-1 cursor-pointer ${
						page >= totalPages ? 'opacity-50 pointer-events-none' : ''
					}`}
				>
					<SecondaryText>Next</SecondaryText>
					<ChevronRight className='w-[18px] h-[18px] text-primaryColor' />
				</div>
			</div>
		</div>
	);
};

export default ProductPagination;

// import React from 'react';
// import SecondaryText from '../reusables/SecondaryText';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const ProductPagination = () => {
// 	return (
// 		<div className='flex justify-between items-center gap-4 my-4'>
// 			<SecondaryText className='size-max'>
// 				Items 1 to 40 of 82 total
// 			</SecondaryText>
// 			<div className='flex items-center gap-4 grow justify-end'>
// 				<div className='flex items-center gap-1 cursor-pointer'>
// 					<ChevronLeft className='w-[18px] h-[18px] text-primaryColor' />
// 					<SecondaryText>Previous</SecondaryText>
// 				</div>
// 				<div className='flex items-center gap-4'>
// 					<button className='px-2 cursor-pointer'>1</button>
// 					<button className='border border-secondaryBorder px-2 cursor-pointer'>
// 						2
// 					</button>
// 					<button className='px-2'>3</button>
// 				</div>
// 				<div className='flex items-center gap-1 cursor-pointer'>
// 					<SecondaryText>Next</SecondaryText>
// 					<ChevronRight className='w-[18px] h-[18px] text-primaryColor' />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ProductPagination;
