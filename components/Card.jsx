// components/Card.js

import React from 'react';

const Card = ({ card, onDelete }) => {
  const handleDelete = () => {
    // Call the onDelete callback with the card ID or any identifier
    onDelete(card.id); // Replace 'id' with the actual property name used to uniquely identify the card
  };

  return (
    <div className="bg-white p-4 my-4 rounded shadow-md w-[300px] h-[300] relative">
      <h3 className="text-lg font-bold mb-2">{`Name: ${card.name}`}</h3>
      <p className="text-gray-500 mb-2">{`Business Line: ${card.space}`}</p>
      <p className="text-gray-700">{`Category: ${card.category}`}</p>
      <button
        className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 focus:outline-none"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
