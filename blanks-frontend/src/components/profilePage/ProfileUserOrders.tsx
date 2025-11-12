'use client';
import React, { useState } from 'react';
import { Package, Calendar, DollarSign } from 'lucide-react';
import { Flex } from '@/components/reusables';
import { useGetAllQuery, useGetByIdQuery } from '@/store/services/commonApi';
import Skeleton from 'react-loading-skeleton';
import OrderViewModal from './OrderViewModal';

const ProfileUserOrders = ({ id }: any) => {

  const { data: allOrders, isLoading } = useGetAllQuery({
    path: `orders`,
    filters: { customer: id },
  });


  // console.log('all orders:', allOrders?.doc);

  const [viewingOrder, setViewingOrder] = useState(null);

  const handleViewOrder = (order: any) => {
    // console.log(order)
    setViewingOrder(order);
  };

  // Sample order history data

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-lg p-8'>
      <div className='flex items-center mb-6'>
        <Package className='w-8 h-8 text-primaryColor mr-3' />
        <h2 className='text-2xl font-bold text-primaryColor'>Order History</h2>
      </div>

      <div className='space-y-4'>
        {isLoading ? (
          <Skeleton height={100} />
        ) : (
          allOrders?.doc?.map((order: any) => (
            <div
              key={order._id}
              className='border border-secondaryBorder rounded-sm p-6 shadow-sm '
            >
              <Flex className='mb-4 justify-between items-center gap-2'>
                <Flex className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4'>
                  {order.items.filter(
                    (item: any, index: number, self: any) =>
                      index === self.findIndex((t: any) => t?.name === item?.name)
                  ).map((item: any) => (
                    <h2 key={item._id} className='text-secondaryColor text-2xl'>
                      {item?.name}
                    </h2>
                  ))}

                  <div className='flex items-center space-x-4'>
                    <span
                      className={`px-3 py-1 rounded-sm text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </Flex>

                <div className='flex items-center text-secondaryColor mt-2 sm:mt-0'>
                  <Calendar className='w-4 h-4 mr-2' />
                  {new Date(order?.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </Flex>

              <div className='flex items-center justify-between'>
                <div className='flex items-center text-lg font-semibold text-primaryColor'>
                  $
                  {order.total.toLocaleString()}
                </div>
                <button
                  onClick={() => handleViewOrder(order)}
                  className='text-primaryColor hover:text-red400 duration-200 font-medium cursor-pointer'
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {viewingOrder && (
        <OrderViewModal
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
        />
      )}
    </div>
  );
};

export default ProfileUserOrders;