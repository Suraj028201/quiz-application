import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import PrivateRoute from './PrivateRoute';
import ReportPage from '../components/ReportPage';

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
                <Route path='report' element={<ReportPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;