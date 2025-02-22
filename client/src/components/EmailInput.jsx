import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const EmailInput = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    localStorage.setItem('userEmail', email);
    history.push('/checkout'); 
  };
  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required/>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
};

export default EmailInput;