import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { state } = useLocation();
  const [email, setEmail] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-checkout-session', {
        email,
        product: state,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <button
        onClick={handlePayment}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
       Add to cart 
      </button>
    </div>
  );
};

export default Checkout;