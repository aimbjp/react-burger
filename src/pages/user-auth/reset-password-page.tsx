import {FormEvent, SyntheticEvent, useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forms.module.css';
import {useForm} from "../../hooks/useForm";
import {changeForgotPasswordEmail, remindPassword, resetPassword} from "../../services/thunk/user";
import {useDispatch} from "../../services/hooks";

export default function ResetPasswordPage() {
    const dispatch = useDispatch();

    const [errorToken, setErrorToken] = useState<string>('')
    const [flag, setFlag] = useState<boolean>(false)

    const {values, handleChange} = useForm<{password: string, token: string}>({password: "", token: ""});

    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = JSON.stringify(values);

        dispatch(resetPassword(payload, setErrorToken, setFlag));

    }

    const handleChangeEmail = (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();

        dispatch(changeForgotPasswordEmail());
    }

    function handleRemindPassword(e: SyntheticEvent<Element, Event>) {
        e.preventDefault();

        dispatch(remindPassword());
    }

    return(
            <main>
                <form name="reset-password" className={styles.form} onSubmit={handleResetPassword}>
                    <h1 className={`text text_type_main-medium pb-6`}>Восстановление пароля</h1>
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        placeholder={'Введите новый пароль'}
                        extraClass="pb-6"
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleChange}
                        value={values.token}
                        name={'token'}
                        errorText={errorToken}
                        size={'default'}
                        extraClass="pb-6"
                        error={flag}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                    <Button htmlType="submit" type="primary" size="large">
                        Сохранить
                    </Button>
                    <section className={`pb-4 pt-20 ${styles.p}`}>
                        <span className='text text_type_main-default text_color_inactive'>
                            Кажется в почту закралась опечатка?
                        </span>
                        <Button htmlType="button" type="secondary" size="medium" extraClass='pl-6 pr-1'
                                onClick={handleChangeEmail}>
                            Назад
                        </Button>
                    </section>
                    <section className={` ${styles.p}`}>
                        <span
                            className='text text_type_main-default text_color_inactive'>Вспомнили пароль?
                        </span>
                        <Button htmlType="button" type="secondary" size="medium" extraClass='pl-6 pr-1' onClick={handleRemindPassword}>
                            Войти
                        </Button>
                    </section>
                </form>
            </main>
    );
}