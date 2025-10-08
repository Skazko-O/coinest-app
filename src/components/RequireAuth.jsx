import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth() {
    const isAuthenticated = !!localStorage.getItem('auth');
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}