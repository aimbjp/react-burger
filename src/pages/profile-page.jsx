import React, {useEffect, useRef, useState} from 'react';
import AppHeader from "../components/header/app-header";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from './forms.module.css';
import getClasses from "../utils/functions/getClassesColor";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../hooks/useForm";
import {getUserInfo, logout, updateUserInfo} from "../services/actions/user";

export default function ProfilePage() {
    const dispatch = useDispatch();

    const email = useSelector(store => store.userReducer.user.email)
    const name = useSelector(store => store.userReducer.user.name)

    const [hasChanges, setHasChanges] = useState(false);
    const [hasNameInput, setHasNameInput] = useState(false);

    const { values, handleChange, setValues } = useForm({
        email: email,
        name: name,
        password: ''
    });

    const inputRefName = useRef(null);

    const onIconClickName = () => {
        setHasNameInput(true);
        setTimeout(() => inputRefName.current.focus(), 0)
    }

    useEffect(() => {
        dispatch(getUserInfo())
            .catch((e) => { console.error(e); });
    }, [dispatch]);

    useEffect(() => {
        if (email !== values.email || name !== values.name) {
            setValues(prevValues => ({...prevValues, email: email, name: name}));
        }
    }, [email, name]);



    const handleProfile = (e) => {
        e.preventDefault();

        const changedValues = {};

        if (values.email !== email) {
            changedValues.email = values.email;
        }
        if (values.name !== name) {
            changedValues.name = values.name;
        }
        if (values.password !== '') {
            changedValues.password = values.password;
        }

        if (Object.keys(changedValues).length > 0) {
            dispatch(updateUserInfo(JSON.stringify(changedValues)));
            setValues(prevValues => ({...prevValues, password: ''}))
        }
    }

    useEffect(() => {
        setHasChanges(!(email === values.email && name === values.name && '' === values.password));
    }, [values.email, values.name, values.password, handleProfile]);

    const handleExit = () => {
        dispatch(logout(JSON.stringify({token: localStorage.getItem("refreshToken")})));
    }

    const handleCancel = () => {
        setValues(prevValues => ({...prevValues, email: email, name: name, password: ''}));
    }

    return(
        <>
            <AppHeader />
            <main className={`text text_type_main-default ${styles.profile_main}`}>
                <section className={styles.menu}>
                    <nav className={`text_type_main-medium ${styles.navigation}`}>
                        <NavLink
                            to='/profile'
                        >
                            {({isActive}) =>
                                <Button htmlType="button" type="secondary" size="large" extraClass={getClasses(`text text_type_main-medium ${styles.navigation_item}`, isActive)} >
                                    <span>Профиль</span>
                                </Button>
                            }
                        </NavLink>
                        <NavLink
                            to='/profile/orders'
                        >
                            {({isActive}) =>
                                <Button htmlType="button" type="secondary" size="large" extraClass={getClasses(`text text_type_main-medium ${styles.navigation_item}`, isActive)} >
                                    <span>История заказов</span>
                                </Button>
                            }
                        </NavLink>
                        <Button
                            htmlType="button" type="secondary" size="large"
                            extraClass={`text text_type_main-medium text_color_inactive ${styles.navigation_item}`}
                            onClick={handleExit}
                        >
                            <span>Выход</span>
                        </Button>
                    </nav>
                    <span className={`text_type_main-small text_color_inactive pt-20`}>
                        В этом разделе вы можете <br/> изменить свои персональные данные
                    </span>
                </section>
                <form name="changeProfile" className={`${styles.form} ${styles.profile_main_form}`} onSubmit={handleProfile}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        icon={'EditIcon'}
                        value={values.name}
                        name={'name'}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="pb-6"
                        ref={inputRefName}
                        onIconClick={onIconClickName}
                        disabled={!hasNameInput}
                        onBlur={() => setHasNameInput(false)}
                    />
                    <EmailInput
                        value={values.email}
                        onChange={handleChange}
                        extraClass='pb-6'
                        isIcon={true}
                        name={'email'}
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        icon="EditIcon"
                        extraClass="pb-6"
                    />
                    {
                        hasChanges &&
                        <section >
                            <Button htmlType={'button'} type={"secondary"} size={"medium"} onClick={handleCancel}>
                                Отменить
                            </Button>
                            <Button htmlType={'submit'} type={"primary"} size={"medium"}>
                                Сохранить
                            </Button>
                        </section>
                    }
                </form>
            </main>
        </>
    );
}