import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Users from './pages/Users';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={['admin', 'attorney']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/cases"
        element={
          <PrivateRoute allowedRoles={['admin', 'attorney']}>
            <Cases />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <Users />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
