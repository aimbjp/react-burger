import React, {FormEvent} from 'react';
import { Button, EmailInput, } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, } from "react-router-dom";
import styles from './forms.module.css';
import { useForm } from "../hooks/useForm";
import { checkEmailExist } from "../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import {IRootState} from "../components/constructor/types-constructor";

export default function ForgotPasswordPage() {
const dispatch = useDispatch();

    const {values, handleChange} = useForm({email: ""});
    const isEmailExist = useSelector((store: IRootState) => store.userReducer.checkEmailExistFailed)

    const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: After storage to ts
        // @ts-ignore
        dispatch(checkEmailExist(JSON.stringify(values)));
    }

    return(
            <main>
                <form name="forgot-password" className={styles.form} onSubmit={handleForgotPassword}>
                    <h1 className={`text text_type_main-medium pb-6`}>Восстановление пароля</h1>
                    <EmailInput
                        value={values.email}
                        placeholder={'Укажите e-mail'}
                        onChange={handleChange}
                        extraClass='pb-6'
                        name='email'
                        {...(isEmailExist ? { error: 'Такой почты не существует' } : {})}
                    />
                        <Button htmlType="submit" type="primary" size="large" >
                            Восстановить
                        </Button>
                    <section className={`pb-4 pt-20 ${styles.p}`}>
                        <p>
                            <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
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