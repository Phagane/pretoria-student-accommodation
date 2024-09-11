import React from "react";
import SearchBar from "./SearchBar";
import FeaturedProperties from "./FeaturedProperties";


const HomeLayout = () =>{
    return(
        <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/pta1.jpg')" }}
        >
            <SearchBar/>
            <FeaturedProperties/>
            
      </div>
    )
}
export default HomeLayout;
