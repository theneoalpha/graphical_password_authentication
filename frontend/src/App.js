import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import Dashboard from './components/Dashboard';
import Home from "./components/Home";


function App (){
    return (
      
        <BrowserRouter>
     
        <Routes>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
         
        </Routes>
      
      </BrowserRouter>
    );
}
export default App;


