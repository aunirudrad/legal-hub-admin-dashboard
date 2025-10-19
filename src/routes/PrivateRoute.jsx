import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple mock auth reading from localStorage
function getUser() {
    try {
        return JSON.parse(localStorage.getItem('legalhub_user'));
    } catch (e) {
        return null;
    }
}

export default function PrivateRoute({ children, allowedRoles = [] }) {
    const user = getUser();
    if (!user) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;
    return children;
}
