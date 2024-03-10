import React, {FormEvent} from 'react';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from './forms.module.css';
import {useForm} from "../hooks/useForm";
import {useDispatch} from "react-redux";
import { login } from "../services/actions/user";

export default function LoginPage() {
    const dispatch = useDispatch();


    const {values, handleChange} = useForm({email: "", password: ""});

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: after storage typed
        // @ts-ignore
        dispatch(login(JSON.stringify(values)));
    }

    return(
        <>
            <main>
                <form name="login" className={styles.form} onSubmit={handleLogin}>
                    <h1 className={`text text_type_main-medium pb-6`}>Вход</h1>
                    <EmailInput
                        value={values.email}
                        onChange={handleChange}
                        extraClass='pb-6'
                        name={'email'}
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        extraClass="pb-6"
                    />
                    <Button htmlType="submit" type="primary" size="large" >
                        Войти
                    </Button>
                    <section className={`pb-4 pt-20 ${styles.p}`}>
                        <p>
                            <span className='text text_type_main-default text_color_inactive'>Вы — новый пользователь?</span>
                            <Link to='/register'>
                                <Button htmlType="button" type="secondary" size="medium" extraClass='pl-6 pr-1' >
                                    Зарегистрироваться
                                </Button>
                            </Link>
                        </p>
                    </section>
                    <section className={` ${styles.p}`}>
                        <p>
                            <span className='text text_type_main-default text_color_inactive'>Забыли пароль?</span>
                            <Link to='/forgot-password'>
                                <Button htmlType="button" type="secondary" size="medium" extraClass='pl-6 pr-1' >
                                    Восстановить пароль
                                </Button>
                            </Link>
                        </p>
                    </section>
                </form>
            </main>
        </>
    );
}