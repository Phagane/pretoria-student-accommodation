import React from 'react';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import HomeLayout from './components/Homepage/HomeLayout';

function App() {
  return (
    <div>
      <Header/>
      <HomeLayout/>
      <Footer/>
    </div>
  );
}

export default App;
