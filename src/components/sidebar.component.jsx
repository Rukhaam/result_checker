import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-full">
      <div className="flex justify-around items-center p-5 border-b-4 border-red-500 bg-white shadow-sm">
        {/* Wrap the logo in a Link tag for navigation */}
        <Link to="/">
          <img 
            src="https://www.indiaresults.com/assets/global-images/IRC-logo.png" 
            alt="India Results Logo"  
            className="w-24 h-auto cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>
        
        <p className="font-bold text-gray-700 uppercase tracking-tight"> 
          India's <span className="text-red-600">#1</span> Results Portal
        </p>
      </div>
    </div>
  );
};

export default SideBar;