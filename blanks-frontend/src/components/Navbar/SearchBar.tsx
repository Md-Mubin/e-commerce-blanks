'use client';
import { useGetAllQuery } from '@/store/services/commonApi';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { InputField } from '../reusables';

export default function SearchBar() {
	const { data: allProducts } = useGetAllQuery({ path: '/products' });
	const router = useRouter();
	const [searchVal, setSearchVal] = useState('');
	const [suggestions, setSuggestions] = useState<any[]>([]);

	// Handle search input
	const handleSearch = (value: string) => {
		setSearchVal(value);

		if (!value || !allProducts) {
			setSuggestions([]);
			return;
		}

		// Make sure the property matches your data
		const filtered = allProducts?.doc.filter((item: any) => {
			return item.name?.toLowerCase().includes(value.toLowerCase());
		});

		setSuggestions(filtered);
	};

	// Handle suggestion click
	const handleSuggestionClick = (id: string) => {
		router.push(`/products/${id}`);
		setSearchVal('');
		setSuggestions([]);
	};

  return (
    <>
      <InputField
        name='search'
        placeholder='Search'
        value={searchVal}
        onChange={(e) => handleSearch(e.target.value)}
        className={'border-2 border-primaryColor outline-none'}
      />
      {/* Suggestions dropdown */}
      {suggestions && suggestions.length > 0 && (
        <div className='absolute top-28 lg:top-12 left-0 border border-gray-300 bg-[#fff] rounded shadow-lg z-10 min-w-full'>
          {suggestions.map((item: any) => (
            <div className='px-4 py-2 flex items-center gap-2  cursor-pointer hover:bg-gray-100 duration-200'
              key={item.id}
              onClick={() => handleSuggestionClick(item.id)}
            >
              <img
                src={item?.image}
                className='w-[20px]'
              />
              {item.name}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
