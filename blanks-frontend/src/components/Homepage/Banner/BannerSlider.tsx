'use client';
import React, { useRef } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const data = [{ img: './blank_hero.png' }, { img: './b-2.jpg' }];
const BannerSlider = ({ bannerData }: any) => {
	
	const swiperRef = useRef<SwiperCore>(null);
	return (
		<div className='relative'>
			<Swiper
				slidesPerView={1}
				modules={[Autoplay, Pagination, Navigation]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class="${className}"></span>`;
					},
				}}
				navigation={true}
				autoplay={{
					delay: 4000,
				}}
				// loop={true}
				onSwiper={swiper => (swiperRef.current = swiper)}
				className='homeSlider'
			>
				{/* h-[28vh] xs:h-[33vh] sm:h-[42vh] md:h-[50vh] lg:h-[48vh] xl:h-[58vh] */}
				{bannerData?.map((imgs: any, i: number) => (
					<SwiperSlide key={i}>
						<div
							className='h-[210px] xs:h-[280px] sm:h-[350px] md:h-[440px] xl:h-[600px] bg-cover bg-center bg-no-repeat'
							style={{
								backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url(${imgs?.image})`,
							}}
						></div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default BannerSlider;
