import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface AdminRouteProps {
    children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { userInfo, getUserInfoLoading } = useAppSelector(state => state.user);
    const { isAuthenticated, loading } = useAppSelector(state => state.auth);

    if (loading || getUserInfoLoading) {
        return null;
    }

    if (!isAuthenticated || !userInfo || userInfo.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};