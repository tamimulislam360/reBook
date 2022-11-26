import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdminOrSeller from '../hooks/useAdminOrSeller';
import Loading from '../shared/Loading/Loading';

const BuyerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdminOrSeller, isAdminLoading] = useAdminOrSeller(user?.email)
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <Loading />;
    }

    if (user && isAdminOrSeller === "buyer") return children
    if(user && isAdminOrSeller === "admin") return <Navigate to="/dashboard/sellers" />
    if(user && isAdminOrSeller === "seller") return <Navigate to="/dashboard" />
    
    return <Navigate to="/login" state={{from: location}} replace />
};

export default BuyerRoute;