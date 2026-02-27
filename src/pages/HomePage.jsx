import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/sidebar.component';

const states = [
  { name: 'Jammu & Kashmir', code: 'JK', active: true },
  { name: 'Punjab', code: 'PB', active: false },
  { name: 'Haryana', code: 'HR', active: false },
  { name: 'Delhi', code: 'DL', active: false },
  { name: 'Maharashtra', code: 'MH', active: false },
  { name: 'Uttar Pradesh', code: 'UP', active: false },
];

const Home = () => {
  return (
   <div>
  <SideBar/>
<div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        IndiaResults Portal
      </h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {states.map((state) => (
          state.active ? (
            <Link 
              key={state.code} 
              to={`/state/${state.code.toLowerCase()}`}
              className="bg-white border-2 border-blue-500 rounded-lg p-6 text-center shadow-md hover:bg-blue-50 transition"
            >
              <h2 className="text-xl font-semibold text-blue-700">{state.name}</h2>
            </Link>
          ) : (
            <div 
              key={state.code} 
              className="bg-gray-200 border-2 border-gray-300 rounded-lg p-6 text-center cursor-not-allowed opacity-60"
            >
              <h2 className="text-xl font-semibold text-gray-500">{state.name}</h2>
              <p className="text-xs text-gray-400 mt-2">Coming Soon</p>
            </div>
          )
        ))}
      </div>

    </div>

    
   </div>

  );
};

export default Home;