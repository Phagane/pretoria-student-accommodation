// src/components/layouts/HomeLayout.js

import React from "react";
import SearchBar from "./SearchBar";
import FeaturedProperties from "./FeaturedProperties";

const HomeLayout = () => {
  return (
    <div>
        <SearchBar />
        <FeaturedProperties />
    </div>
  );
};
export default HomeLayout;
