import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({element}) => {

    const isAuthenticated = () => {
        const email = localStorage.getItem('email');
        return email !== null && email.trim() !== '';
    };


    return (
        isAuthenticated() ? element : <Navigate to="/" />
    )
}

export default PrivateRoute;