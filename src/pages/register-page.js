import React from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from './forms.module.css';
import { useForm } from "../hooks/useForm";
import {useDispatch, useSelector} from "react-redux";
import { register } from "../services/actions/user";

export default function RegisterPage() {
    const dispatch = useDispatch();

    const {values, handleChange} = useForm({email: "", password: "", name: ""});
    const isRegistered = useSelector( store => store.userReducer.registerFailed);

    const handleRegister = (e) => {
        e.preventDefault();

        dispatch(register(JSON.stringify(values)));
    }

    return(
        <>
            <main className={styles}>
                <form name="register" className={styles.form} onSubmit={handleRegister}>
                    <h1 className={`text text_type_main-medium pb-6`}>Регистрация</h1>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        value={values.name}
                        name={'name'}
                        errorText={'Такой пользователь уже существует'}
                        size={'default'}
                        extraClass="pb-6"
                    />
                    <EmailInput
                        value={values.email}
                        {...(isRegistered ? { error: 'Такой пользователь уже существует' } : {})}
                        errorText={'Такой пользователь уже существует'}
                        name={'email'}
                        onChange={handleChange}
                        extraClass='pb-6'
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        extraClass="pb-6"
                    />
                    <Button htmlType="submit" type="primary" size="large" >
                        Зарегистрироваться
                    </Button>
                    <section className={`pb-4 pt-20 ${styles.p}`}>
                        <p>
                            <span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</span>
                            <Link to='/login'>
                                <Button htmlType="button" type="secondary" size="medium" extraClass='pl-6 pr-1' >
                                    Войти
                                </Button>
                            </Link>
                        </p>
                    </section>
                </form>
            </main>
        </>
    );
}