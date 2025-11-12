'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecentViews, RecentProduct } from '@/lib/recentViews';
import SecondaryText from '../reusables/SecondaryText';
import { TextBase } from '../reusables';

export default function RecentViews() {
  const [recent, setRecent] = useState<RecentProduct[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const views = getRecentViews();
    setRecent(views);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        <SecondaryText className='leading-[14px]'>Recently</SecondaryText>
        <TextBase className='text-secondaryColor'>Viewed</TextBase>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[400px] bg-white border border-gray-300 rounded-sm shadow-lg z-50 overflow-hidden">
          {recent.length > 0 ? (
            recent.map((item) => (
              <Link
                href={`/products/${item._id}`}
                key={item._id}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">${item.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-sm p-3 text-center">
              No recent views yet
            </p>
          )}
        </div>
      )}
    </div>
  );
}
