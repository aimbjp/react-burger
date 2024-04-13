import styles from "../../pages/user-auth/forms.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "../../services/hooks";
import {useForm} from "../../hooks/useForm";
import {getUserInfo, updateUserInfo} from "../../services/thunk/user";
import {FormEvent, MutableRefObject, useEffect, useRef, useState} from "react";

interface ProfileForm {
    email?: string;
    name?: string;
    password?: string;
}

export function ProfileMain () {
    const dispatch = useDispatch();

    const email = useSelector((store) => store.userReducer.user.email)
    const name = useSelector((store) => store.userReducer.user.name)

    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [hasNameInput, setHasNameInput] = useState<boolean>(false);

    const { values, handleChange, setValues } = useForm<{
        email: string;
        name: string;
        password: string;
    }>({
        email: email,
        name: name,
        password: ''
    });

    const inputRefName: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);

    const onIconClickName = () => {
        setHasNameInput(true);
        setTimeout(() => inputRefName.current?.focus(), 0)
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                await dispatch(getUserInfo());
            } catch (error) {
                console.error('Ошибка при получении информации о пользователе: ', error);
            }
        };

        fetchUserInfo();
    }, [dispatch]);

    useEffect(() => {
        if (email !== values.email || name !== values.name) {
            setValues(prevValues => ({...prevValues, email: email, name: name}));
        }
    }, [email, name]);

    const handleProfile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const changedValues: ProfileForm = {};

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



    const handleCancel = () => {
        setValues(prevValues => ({...prevValues, email: email, name: name, password: ''}));
    }

    return (
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
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
                <section>
                    <Button htmlType={'button'} type={"secondary"} size={"medium"} onClick={handleCancel}>
                        Отменить
                    </Button>
                    <Button htmlType={'submit'} type={"primary"} size={"medium"}>
                        Сохранить
                    </Button>
                </section>
            }
        </form>)
}