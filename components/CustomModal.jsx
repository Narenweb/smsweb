// components/CustomModal.js

import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';

const options = [
  { value: 'house', label: 'House' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'wedding', label: 'Wedding' },
];

const spaceOptions = [
  { value: 'space', label: 'Space' },
  { value: 'celebration', label: 'Celebration' },
];

const CustomModal = ({ isOpen, onRequestClose, onCardCreate }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [businessCategory, setBusinessCategory] = useState('');

  const handleSubmit = () => {
    if (selectedOption && selectedSpace && businessCategory) {
      const newCard = {
        name: selectedOption.label,
        space: selectedSpace.label,
        category: businessCategory,
      };

      // Pass the new card to the parent component
      onCardCreate(newCard);

      // Reset state values
      setSelectedOption(null);
      setSelectedSpace(null);
      setBusinessCategory('');

      // Close the modal
      onRequestClose();
    } else {
      // Handle validation or display an error message
      console.error('Please fill in all fields');
    }
  };

  const handleCancel = () => {
    // Reset state values
    setSelectedOption(null);
    setSelectedSpace(null);
    setBusinessCategory('');

    // Close the modal
    onRequestClose();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Create a business kind</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Category</label>
          <CustomDropdown
            options={options}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Space</label>
          <CustomDropdown
            options={spaceOptions}
            selectedOption={selectedSpace}
            onSelect={setSelectedSpace}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Business Category</label>
          <input
            type="text"
            value={businessCategory}
            onChange={(e) => setBusinessCategory(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Business Category"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-blue"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
