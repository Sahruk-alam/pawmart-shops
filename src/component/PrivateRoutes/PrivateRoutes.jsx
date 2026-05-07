import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/Loading';
import { AuthContext } from '../AuthProvider/AuthProvider';

const PrivateRoutes = ({children}) => {
    const {user, loading}=useContext(AuthContext);
    const location=useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email ){
        return children; 
    }
    return <Navigate  to='/auth/login' replace state={{ from: location }}></Navigate>
};

export default PrivateRoutes;