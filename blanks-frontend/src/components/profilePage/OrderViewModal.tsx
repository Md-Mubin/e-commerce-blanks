'use client';
import { X } from 'lucide-react';
import React from 'react';

const OrderViewModal = ({ order, onClose }: any) => {
	// console.log('order', order);
	const totalQuantity = order.items.reduce((sum: any, item: any) => sum + item.qty, 0);

	return (
		<div className='fixed inset-0 bg-[#00000066] bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white p-6 rounded-sm max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto '>
				<div className='flex justify-between items-center mb-4'>
					<h3 className='text-lg font-semibold'>Order Details</h3>
					<X size={20} className='cursor-pointer' onClick={onClose} />
				</div>

				<div className='space-y-6'>
					{/* Order Info */}
					<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
						<div className='flex flex-col gap-2'>
							<p className='text-sm font-medium text-gray-900'>Status</p>
							<span
								className={`inline-block w-fit px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-primaryTextColor capitalize`}
							>
								{order.status
									.replace('-', ' ')
									.replace(/\b\w/g, (l: any) => l.toUpperCase())}
							</span>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-sm font-medium text-primaryTextColor'>Total</p>
							<p className='text-gray-700 font-semibold'>৳{order.total}</p>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-sm font-medium text-primaryTextColor'>Order Date</p>
							<p className='text-gray-900'>
								{new Date(order.createdAt).toLocaleDateString()}
							</p>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-sm font-medium text-primaryTextColor'>Total Items</p>
							<p className='text-gray-900'>{totalQuantity}</p>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-sm font-medium text-primaryTextColor'>
								Payment Status
							</p>
							<p
								className={`text-sm font-medium ${order.isPaid ? 'text-green-600' : 'text-red-600'
									}`}
							>
								{order.isPaid ? 'Paid' : 'Unpaid'}
							</p>
						</div>
					</div>

					{/* Customer Info */}
					<div className='border-t pt-4'>
						<h4 className='font-semibold text-primaryColor mb-3'>
							Customer Information
						</h4>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex flex-col gap-2'>
								<p className='text-sm font-medium text-primaryTextColor'>Name</p>
								<p className='text-gray-900'>{order?.customer?.name}</p>
							</div>
							<div className='flex flex-col gap-2'>
								<p className='text-sm font-medium text-primaryTextColor'>Phone</p>
								<p className='text-gray-900'>{order?.address?.phone || 'N/A'}</p>
							</div>
							<div className='flex flex-col gap-2'>
								<p className='text-sm font-medium text-primaryTextColor'>Email</p>
								<p className='text-gray-900'>{order?.customer?.email}</p>
							</div>
							<div className='flex flex-col gap-2'>
								<p className='text-sm font-medium text-primaryTextColor'>Area</p>
								<p className='text-gray-900'>{order?.address?.area || 'N/A'}</p>
							</div>
							<div className='md:col-span-2 flex flex-col gap-2'>
								<p className='text-sm font-medium text-primaryTextColor'>Address</p>
								<p className='text-gray-900'>{order?.address?.address || 'N/A'}</p>
							</div>
							{order?.address?.notes && (
								<div className='md:col-span-2 flex flex-col gap-2'>
									<p className='text-sm font-medium text-primaryTextColor'>Notes</p>
									<p className='text-gray-900'>{order?.address?.notes}</p>
								</div>
							)}
						</div>
					</div>

					{/* Order Items */}
					<div className='border-t pt-4'>
						<h4 className='font-semibold text-primaryTextColor mb-3'>Order Items</h4>
						{order?.items?.length > 0 ? (
							<div className='space-y-3'>
								{order.items.map((item: any) => (
									<ul
										key={item?._id}
										className='flex justify-between items-center p-3 bg-black rounded-sm'
									>
										<div>
											<p className='font-medium text-primaryTextColor'>{item?.name}</p>
											<p className='text-sm text-gray-600 mt-2'>
												Price: ${item?.unitPrice} × {item?.qty}
											</p>
										</div>
										<div className='text-right'>
											<p className='font-semibold text-primaryTextColor'>
												${item?.unitPrice * item?.qty}
											</p>
										</div>
									</ul>
								))}

								<div className='border-t pt-3 mt-3'>
									<div className='flex justify-between items-center'>
										<span className='font-semibold text-primaryTextColor'>
											Total Amount:
										</span>
										<span className='font-bold text-lg text-primaryTextColor'>
											${order?.total}
										</span>
									</div>
								</div>
							</div>
						) : (
							<p className='text-gray-500'>No items in this order</p>
						)}
					</div>
				</div>

				<div className='mt-6 pt-4 border-t'>
					<button
						onClick={onClose}
						className='w-full bg-commonBtnBg hover:bg-commonBtnBgHover duration-200 text-white py-2 rounded-md cursor-pointer'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderViewModal;