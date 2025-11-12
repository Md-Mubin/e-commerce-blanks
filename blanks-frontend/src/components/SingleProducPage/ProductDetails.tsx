import { PrimaryHeading, SecondaryHeading } from '../reusables';

type ProductDetailsProps = {
	product: any;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
	return (
		<>
			<SecondaryHeading className='text-primaryColor font-normal text-xs'>
				{product?.category?.name}
			</SecondaryHeading>

			{/* Product Title */}
			<PrimaryHeading className='mt-[-4px] capitalize'>{product?.name}</PrimaryHeading>

			{/* Product Info */}
			<div className='space-y-2 text-sm'>
				{/* <div className='flex'>
					<span className='font-semibold w-16'>SKU:</span>
					<span className='text-gray-600'>5000-WHITE-M</span>
				</div> */}
				<div className='flex'>
					<span className='font-semibold w-16'>UPC:</span>
					<span className='text-gray-600'>{product?.upc || 'N/A'}</span>
				</div>
				<div className='flex'>
					<span className='font-semibold w-16'>MPN:</span>
					<span className='text-gray-600'>{product?.mpn || 'N/A'}</span>
				</div>
			</div>

			{/* Price */}
			<div className='text-3xl text-gray-900'>
				From: <strong className='font-bold'>$ {product?.price?.toFixed(2).toLocaleString()}</strong>
			</div>
		</>
	);
};

export default ProductDetails;

{
	/* Rating */
}
{
	/* <div className="flex items-center space-x-2">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <span className="text-gray-600">(55 reviews)</span>
        <button className="text-blue-600 hover:underline">Write a Review</button>
      </div> */
}
