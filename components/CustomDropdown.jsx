import React, { useState, useRef, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

const CustomDropdown = ({
  options,
  selectedOption,
  onSelect,
  styles,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  // Close the dropdown when clicking outside
  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="custom-dropdown relative flex justify-center"
      ref={dropdownRef}
    >
      <div
        className={`selected-option p-3 rounded-md border-gray-400 border cursor-pointer w-[80%] relative  ${styles}`}
        onClick={handleToggle}
      >
        <div className="border-r absolute top-3 right-10 border-gray-400 opacity-[0.6] w-3 h-6"></div>
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronDownIcon
          className={`ml-2 transform absolute top-3 w-[25px] right-2 text-gray-400 opacity-[0.7] ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`options absolute border rounded-t mt-1 overflow-hidden z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            className="px-2 py-1 cursor-pointer text-black hover:bg-lightTheme hover:text-white"
            onClick={() => handleOptionClick(opt)}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDropdown;
