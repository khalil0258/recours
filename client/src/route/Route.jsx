import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './../screens/home/home';

const RouteContainer = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        
      </Routes>
    </Router>
  );
};

export default RouteContainer;
