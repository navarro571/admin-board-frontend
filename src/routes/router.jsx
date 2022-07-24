import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router;