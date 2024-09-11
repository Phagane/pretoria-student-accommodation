import React from "react";
import SearchBar from "./SearchBar";


const HomeLayout = () =>{
    return(
        <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/pta1.jpg')" }}
        >
            <SearchBar/>
      </div>
    )
}
export default HomeLayout;
