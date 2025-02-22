import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Cart = ({ image, title, description, price }) => {
  const navigate = useNavigate(); 

  const handleCheckout = () => {
    navigate('/Checkout', { state: { image, title, description, price } });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-900 font-bold text-lg mt-2">${price}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button 
          onClick={handleCheckout} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Cart; 
