
const CardImg = ({ img }: any) => {
	// console.log('img:', img);
	return (
		<img
			width={220}
			height={320}
			alt='property_image'
			src={img}
			className='w-full h-[320px] object-cover object-center'
		/>
	);
};

export default CardImg;
