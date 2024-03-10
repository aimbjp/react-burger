import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {FC, ReactElement} from "react";


// TODO: when storage done, change this int

interface IRootState {
    userReducer: {
        user: {
            email: string;
        };
        tokenChecked: boolean;
        emailChecked: boolean;
        resetPasswordSuccess: boolean;
        resetPasswordEnd: boolean;
    };
}

interface TProtectedRoute {
    onlyUnAuth?: boolean;
    component: ReactElement;
}

const ProtectedRoute: FC<TProtectedRoute> = ({ onlyUnAuth = false, component }) => {
    const location = useLocation();

    const email = useSelector(
        (state: IRootState) => state.userReducer.user.email
    ) !== '';
    const isAuthChecked = useSelector(
        (state: IRootState) => state.userReducer.tokenChecked
    );
    const isResetPasswordAllowed = useSelector(
        (state: IRootState) => state.userReducer.emailChecked
    );
    const isResetPasswordSuccess = useSelector(
        (state: IRootState) => state.userReducer.resetPasswordSuccess
    );
    const isResetPasswordEnd = useSelector(
        (state: IRootState) => state.userReducer.resetPasswordEnd
    );

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

export const OnlyAuth: FC<TProtectedRoute> = ProtectedRoute;

export const OnlyUnAuth: FC<TProtectedRoute> = ({ component }) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);
