import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegisterPage } from '../../pages';
import ResetPasswordPage from "../../pages/reset-password-page";
import { checkUserAuth } from "../../services/actions/user";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import IngredientsDetails from "../ingredients/ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import AppHeader from "../header/app-header";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleCloseModal = () => {
        navigate(-1);
    };

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkUserAuth());
    }, [dispatch]);

    return (
        <>
            <AppHeader/>
            <Routes location={ background || location }>
                <Route path='/' element={<HomePage />}/>
                <Route path='/login' element={ <OnlyUnAuth component={ <LoginPage /> } /> } />
                <Route path='/register' element={ <OnlyUnAuth component={ <RegisterPage /> } /> }/>
                <Route path='/forgot-password' element={ <OnlyUnAuth component={ <ForgotPasswordPage /> } /> }/>
                <Route path='/reset-password' element={ <OnlyUnAuth component={ <ResetPasswordPage /> } /> }/>
                <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />}/>
                <Route path='/profile/orders' element={<OnlyAuth component={<ProfilePage />} />}/>
                <Route path='/ingredients/:ingredientId' element={<><IngredientsDetails /> </>}/>
                <Route path='*' element={<HomePage />}/>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                                <IngredientsDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
