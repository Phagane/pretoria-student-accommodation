import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import HomeLayout from './components/Homepage/HomeLayout';
import PropertyDetails from './components/Homepage/PropertyDetails';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
