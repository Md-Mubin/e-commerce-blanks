'use client';
import { useState } from 'react';

interface PerPageDropdownProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

const PerPageDropdown = ({ value, options, onChange }: PerPageDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center px-3 py-1 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        Products Per Page: {value} <span className="ml-1">▼</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              className="w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerPageDropdown;