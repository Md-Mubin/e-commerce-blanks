'use client';
import React from 'react';
import { Column, Flex } from '../reusables';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Share from 'yet-another-react-lightbox/plugins/share';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const ProductImage = ({ images }: { images: any }) => {
	// console.log('images', images);

	const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
	const thumbnailsRef = React.useRef(null);

	const openLightbox = () => {
		setIsLightboxOpen(true);
	};

	const closeLightbox = () => setIsLightboxOpen(false);

	return (
		<Column className='space-y-1 md:items-start'>
			{/* Main product image */}
			<div
				className='h-[450px] w-full md:w-[296px] overflow-hidden cursor-pointer group relative'
				onClick={openLightbox} // big image click → lightbox
			>
				<img
					src={images[currentImageIndex]}
					alt='images'
					className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
				/>
				<div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
					<span className='text-white font-semibold'>Quick View</span>
				</div>
			</div>

			{/* Thumbnails */}
			<Flex className='justify-start gap-1'>
				{images?.map((image: any, index: number) => (
					<div
						key={index}
						className={`w-24 h-26 overflow-hidden border cursor-pointer hover:opacity-80 ${
							index === currentImageIndex ? 'border-[black]' : 'border-[transparent]'
						}`}
						onClick={() => setCurrentImageIndex(index)} // only change main image
					>
						<img
							src={image}
							alt={`Thumbnail ${index + 1}`}
							className='w-full h-full object-cover'
						/>
					</div>
				))}
			</Flex>

			{/* Lightbox */}
			{isLightboxOpen && (
				<Lightbox
					slides={images.map((img: any) => ({ src: img }))}
					// plugins={[Thumbnails]}
					open={isLightboxOpen}
					index={currentImageIndex}
					close={closeLightbox}
					thumbnails={{ ref: thumbnailsRef }}
					render={{
						slide: ({ slide, rect }) => (
							<img
								src={slide.src}
								alt={slide.alt}
								style={{
									height: '90vh',
									objectFit: 'contain',
								}}
							/>
						),
					}}
				/>
			)}
		</Column>
	);
};

export default ProductImage;
