import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ image, title, description, price }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/checkout', { state: { image, title, description, price } });
  };
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 m-4 bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2 text-gray-800">{title}</div>
        <p className="text-gray-600 text-base mb-2 line-clamp-3">{description}</p>
        <p className="text-gray-900 font-semibold text-lg mt-2">${price}</p>
      </div>
      <div className="px-6 pt-4 pb-6">
        <button 
          onClick={handleCheckout} 
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
