import React from 'react';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



const App = () => {
  return (
    <BrowserRouter>
      
      <div>
        </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
