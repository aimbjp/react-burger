import React, { useEffect } from 'react';
import { getIngredients } from "../../services/thunk/ingredients";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {FeedPage, ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegisterPage} from '../../pages';
import ResetPasswordPage from "../../pages/user-auth/reset-password-page";
import { checkUserAuth } from "../../services/thunk/user";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import IngredientsDetails from "../ingredients/ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import AppHeader from "../header/app-header";
import {useDispatch} from "../../services/hooks";
import {ProfileMain} from "../profile/profile-main";
import {ProfileFeed} from "../profile/profile-feed";
import {Order} from "../order/order";

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
                <Route path='/profile' element={<OnlyAuth component={<ProfilePage element={<ProfileMain />}/>} />}/>
                <Route path='/profile/orders' element={<OnlyAuth component={<ProfilePage element={<ProfileFeed />} />} />}/>
                <Route path='/ingredients/:ingredientId' element={<><IngredientsDetails /> </>}/>
                <Route path='/feed/:id' element={<Order /> }/>
                <Route path='/profile/orders/:id' element={<OnlyAuth component={<Order />} />} />
                <Route path='/feed' element={<FeedPage />} />
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
            {background && (
                <Routes>
                    <Route
                        path='/feed/:id'
                        element={
                        <Modal title="Заказ" onClose={handleCloseModal}>
                            <Order />
                        </Modal>}
                    />
                </Routes>
            )}
            {background && (
                <Routes>
                    <Route
                        path='/profile/orders/:id'
                        element={
                            <OnlyAuth component={
                                <Modal title="Заказ" onClose={handleCloseModal}>
                                    <Order />
                                </Modal>
                            }/>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
