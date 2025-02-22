import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import From from './components/Form'
const App = () => {
  return (
   <BrowserRouter>
      <Routes>
         <Route path='/' element= {<From />} />
        
        {/* <Route path='/' element={<CardPage />}>
          <Route path="/" element={<CardPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

