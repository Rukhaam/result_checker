import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import JkSearch from './pages/searchedPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/state/jk" element={<JkSearch />} />
    </Routes>
  );
}

export default App;