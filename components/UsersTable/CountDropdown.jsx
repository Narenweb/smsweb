import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (newValue) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className={`fill-current h-4 w-4 transition-transform duration-300 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6z"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1  w-full bg-white border border-gray-400 rounded shadow-lg flex flex-col items-center">
          {options.map((option) => (
            <div
              key={option}
              className="px-5 py-1 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
