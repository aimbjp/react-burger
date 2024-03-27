import { Navigate, useLocation } from "react-router-dom";
import {FC, ReactElement} from "react";
import {useSelector} from "../../services/hooks";
import styleLoader from '../../utils/styles/loader.module.css';
import {Loader} from "../elements";

interface TProtectedRoute {
    onlyUnAuth?: boolean;
    component: ReactElement;
}

const ProtectedRoute: FC<TProtectedRoute> = ({ onlyUnAuth = false, component }) => {
    const location = useLocation();

    const email = useSelector(
        (state) => state.userReducer.user.email
    ) !== '';
    const isAuthChecked = useSelector(
        (state) => state.userReducer.tokenChecked
    );
    const isResetPasswordAllowed = useSelector(
        (state) => state.userReducer.emailChecked
    );
    const isResetPasswordSuccess = useSelector(
        (state) => state.userReducer.resetPasswordSuccess
    );
    const isResetPasswordEnd = useSelector(
        (state) => state.userReducer.resetPasswordEnd
    );

    if (!isAuthChecked) {
        return (<Loader />);
    }


    if (onlyUnAuth && email) {
        const {from} = location.state || {from: {pathname: "/"}};
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

export const OnlyAuth: FC<TProtectedRoute> = ProtectedRoute;

export const OnlyUnAuth: FC<TProtectedRoute> = ({ component }) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);
