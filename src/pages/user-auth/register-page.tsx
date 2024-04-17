import React, {FormEvent} from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from './forms.module.css';
import { useForm } from "../../hooks/useForm";
import { register } from "../../services/thunk/user";
import {useDispatch, useSelector} from "../../services/hooks";

export default function RegisterPage() {
    const dispatch = useDispatch();

    const {values, handleChange} = useForm<{
        email: string;
        name: string;
        password: string;
    }>({email: "", password: "", name: ""});
    const isRegistered = useSelector( (store) => store.userReducer.registerFailed);

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(register(values));
    }

    return(
            <main>
                <form name="register" className={styles.form} onSubmit={handleRegister}>
                    <h1 className={`text text_type_main-medium pb-6`}>Регистрация</h1>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        value={values.name}
                        name={'name'}
                        // errorText={'Такой пользователь уже существует'}
                        size={'default'}
                        extraClass="pb-6" onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                    <EmailInput
                        value={values.email}
                        {...(isRegistered ? { error: 'Такой пользователь уже существует!!!!!' } : {})}
                        // errorText={'Такой пользователь уже существует'}
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
    );
}