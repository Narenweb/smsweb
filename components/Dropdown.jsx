import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  options,
  labelName,
  onSelect,
  placeholder,
  isError,
  ErrorMessage,
  id,
  defaultOption,
}) {
  const [selectedOption, setSelectedOption] = useState(() => {
    // Check local storage for previously selected option
    const storedOption = localStorage.getItem(`${id}-selected-option`);
    return storedOption
      ? JSON.parse(storedOption)
      : defaultOption || { label: "", value: "" };
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  useEffect(() => {
    // Call the onSelect callback when the selected value changes
    onSelect({ value: selectedOption || defaultOption });
    console.log("value in dropdown component", selectedOption);
    console.log("value in dropdown default options", defaultOption);
    localStorage.setItem(
      `${id}-selected-option`,
      JSON.stringify(selectedOption)
    );
  }, [selectedOption, onSelect, id]);
  const isOptionSelected = selectedOption.value !== "";
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <label className="block font-medium leading-6 text-gray-900">
            {labelName}
          </label>
          <Menu.Button
            id={id}
            className={`inline-flex justify-between gap-x-1.5 rounded-md bg-white px-3 py-3 text-[#767676] shadow-sm ring-1 ring-inset ${
              isError && !isOptionSelected
                ? "ring-red-500 ring-2"
                : "ring-[#E1E1E1]"
            } hover:bg-gray-50 pl-5 w-[370px] mt-3`}
          >
            {selectedOption.label || placeholder}
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`dropdown-options absolute right-0 z-10 mt-2 text-center origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none getOptions w-[370px] cursor-pointer max-h-[400px] overflow-y-auto ${
              isError && !isOptionSelected ? "ring-red-500" : ""
            }`}
          >
            {options.map((opt) => (
              <div className="py-1" key={opt.value}>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => handleOptionClick(opt)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {opt.label}
                    </div>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      {isError && !isOptionSelected && (
        <p className="mt-2 text-sm text-red-600" id={`${labelName}-error`}>
          {ErrorMessage}
        </p>
      )}
    </div>
  );
}
