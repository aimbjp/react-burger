import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
    const location = useLocation();

    const email = useSelector(store => store.userReducer.user.email) !== '';
    const isAuthChecked = useSelector(store => store.userReducer.tokenChecked);
    const isResetPasswordAllowed = useSelector(store => store.userReducer.emailChecked);
    const isResetPasswordSuccess = useSelector(store => store.userReducer.resetPasswordSuccess);
    const isResetPasswordEnd = useSelector(store => store.userReducer.resetPasswordEnd);

    //TODO: Make loader
    if (!isAuthChecked) { return <>Загружаем данные</>; }


    if (onlyUnAuth && email) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !email) {
        return <Navigate to={'/login'} state={{ from: location }} />;
    }

    if (location.pathname === '/reset-password' && isResetPasswordAllowed && !isResetPasswordSuccess) {
        if (location.pathname !== '/reset-password') return  <Navigate to={'/reset-password'} />;
    } else if (location.pathname === '/reset-password' && !isResetPasswordAllowed && !isResetPasswordEnd){
        return <Navigate to={'/forgot-password'} />;
    } else if (location.pathname === '/reset-password' && !isResetPasswordAllowed && isResetPasswordEnd) {
        return <Navigate to={'/login'} />;
    }

    if (location.pathname === '/forgot-password' && isResetPasswordAllowed) {
        return  <Navigate to={'/reset-password'} />;
    }

    return component;
}

export const OnlyAuth = ProtectedRoute;

export const OnlyUnAuth = ({ component }) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);
