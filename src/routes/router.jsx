import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/home' element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router;