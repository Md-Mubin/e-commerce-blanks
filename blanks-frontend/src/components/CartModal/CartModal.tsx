// src/components/Cart.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ButtonPrimary, Flex, PrimaryText } from '../reusables';
import SecondaryText from '../reusables/SecondaryText';
import { FiTrash2 } from 'react-icons/fi';
import { removeFromCart } from '@/store/slices/cartSlice';
// const tempoItems = [
// 	{
// 		id: 'Classic Hoodie-Black-Toronto, ON-S',
// 		image: '/product-1.jpg',
// 		productName: 'Classic Hoodie',
// 		warehouseName: 'Toronto, ON',
// 		selectedColor: 'Black',
// 		price: 49.99,
// 		size: 'S',
// 		quantity: 10,
// 	},
// 	{
// 		id: 'Classic Hoodie-Black-Mississauga, ON-M',
// 		image: '/product-1.jpg',
// 		productName: 'Classic Hoodie',
// 		warehouseName: 'Mississauga, ON',
// 		selectedColor: 'Black',
// 		price: 59.99,
// 		size: 'M',
// 		quantity: 12,
// 	},
// ];
const CartModal = () => {

	const cartItems = useSelector((state: RootState) => state.cart.items);

	const dispatch = useDispatch()
	// console.log('cartItems:', cartItems);
	// const items = useSelector((state: RootState) => state.cart.items);
	// const items = tempoItems;
	// console.log('items to cart:', items);
	return (
		<div className='w-[420px] bg-white border border-secondaryBorder rounded-sm shadow-lg flex flex-col'>
			{
				cartItems?.length < 1 ?
					(<div className='p-4 text-center'>
						<PrimaryText>No Items in Cart</PrimaryText>
					</div>)
					:
					(<>
						<div className='max-h-[300px] overflow-y-auto'>
							{cartItems?.map((item: any) => (
								<Flex
									key={item?.id}
									className='items-start gap-3 py-2 px-2 border-b border-secondaryBorder last:border-b-0'
								>
									<img
										src={item.image}
										alt={item.productName}
										className='w-[100px] h-[120px] object-contain'
									/>
									<Flex className='flex-1 justify-between'>
										<div className='flex flex-col gap-1'>
											<PrimaryText>{item.productName}</PrimaryText>
											<SecondaryText className='text-[12px]'>
												Size: {item.size}
											</SecondaryText>
											{/* <SecondaryText className='text-[12px]'>
												Color: {item?.selectedColor}
											</SecondaryText> */}
											<SecondaryText className='text-[12px]'>
												Quantity: {item.qty}
											</SecondaryText>
											<SecondaryText className='text-[12px]'>
												Price: {(item.qty * item.price).toFixed(2)}
											</SecondaryText>
										</div>
										<button
											// onClick={() => removeItem(item.id)}
											className='text-gray-500 hover:text-red400 self-end mb-2 cursor-pointer'
										>
											<FiTrash2
												onClick={() => dispatch(removeFromCart(item?.id))}
												size={16} />
										</button>
									</Flex>
								</Flex>
							))}
						</div>

						{/* Buttons Fixed at Bottom */}
						<div className='flex gap-2 p-3 border-t border-gray-200'>
							<ButtonPrimary
								href='/checkout'
								linkBtnClasses='flex-1 bg-black text-primaryColor hover:bg-red400 duration-300'
							>
								CHECK OUT
							</ButtonPrimary>
							<ButtonPrimary href='/cart' linkBtnClasses='flex-1 text-primaryColor hover:bg-red400 duration-300'>
								VIEW CART
							</ButtonPrimary>
						</div>
					</>)
			}
			{/* Scrollable Items */}

		</div>
	);
};

export default CartModal;
// <div className='bg-red-200'>
// 	<h2>Your Cart</h2>
// 	{items.map(item => (
// 		<div key={item.id} className='flex justify-between mb-2'>
// 			<img src={item.image} alt={item.productName} className='w-16' />
// 			<div>
// 				<p>
// 					{item.productName} - {item.selectedColor} - {item.size} -{' '}
// 					{item.warehouseName}
// 				</p>
// 				<input
// 					type='number'
// 					value={item.quantity}
// 					onChange={e =>
// 						dispatch(
// 							updateQuantity({
// 								id: item.id,
// 								quantity: parseInt(e.target.value) || 0,
// 							})
// 						)
// 					}
// 					min='0'
// 					className='w-16'
// 				/>
// 			</div>
// 			<button
// 				onClick={() => dispatch(removeFromCart(item.id))}
// 				className='text-red-500'
// 			>
// 				Delete
// 			</button>
// 		</div>
// 	))}
// 	<p>Total Items: {items.reduce((sum, item) => sum + item.quantity, 0)}</p>
// </div>
