"use client"
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: any) => {
    setQuantity(Math.max(1, quantity + change));
  };
  return (
    <div className="space-y-3">
      <span className="font-semibold">QUANTITY:</span>
      <div className="flex items-center border border-gray-300 rounded overflow-hidden w-fit">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="px-3 py-2 hover:bg-gray-50 transition-colors border-r border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={quantity <= 1}
        >
          <ChevronDown className="w-4 h-4 " />
        </button>
        <input
          type="text"
          value={quantity}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            if (value === '' || parseInt(value) < 1) {
              setQuantity(1);
            } else {
              setQuantity(parseInt(value));
            }
          }}
          onBlur={(e) => {
            if (e.target.value === '' || parseInt(e.target.value) < 1) {
              setQuantity(1);
            }
          }}
          className="w-16 px-2 py-2 text-center focus:outline-none focus:bg-blue-50 bg-white"
          min="1"
        />
        <button
          onClick={() => handleQuantityChange(1)}
          className="px-3 py-2 hover:bg-gray-50 transition-colors border-l border-gray-300"
        >
          <ChevronDown className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  )
}

export default Quantity