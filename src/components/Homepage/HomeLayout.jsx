// src/components/layouts/HomeLayout.js

import React from "react";
import SearchBar from "./SearchBar";
import FeaturedProperties from "./FeaturedProperties";

const HomeLayout = () => {
  return (
    <div className="relative w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/pta1.jpg')" }}>
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content on top of the background */}
      <div className="relative z-10">
        <SearchBar />
        <FeaturedProperties />
      </div>
    </div>
  );
};

export default HomeLayout;
