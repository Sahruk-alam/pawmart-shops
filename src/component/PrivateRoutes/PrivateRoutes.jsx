import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';

const PrivateRoutes = ({children}) => {
    const {user, loading}=useContext(AuthContext);
    const location=useLocation();
    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(user && user?.email ){
        return children; 
    }
    return <Navigate  to='/login' replace state={{ from: location }}></Navigate>
};

export default PrivateRoutes;