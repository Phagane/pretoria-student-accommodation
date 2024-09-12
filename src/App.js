import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import HomeLayout from './components/Homepage/HomeLayout';
import PropertyDetails from './components/Homepage/PropertyDetails';
import LandlordProperties from './components/Admin/LandlordProperties';

const App = () => {
  const adminEmail = 'contact@johndoerealestate.com'; // Specify the admin email here


  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route
            path="/admin"
            element={<LandlordProperties adminEmail={adminEmail} />}/>
        </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
