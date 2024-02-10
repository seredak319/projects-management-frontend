import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from 'react-redux';

export function RequireAuth({ children }) {
    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    let location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}