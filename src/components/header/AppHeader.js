import React from 'react';
import { Logo, ProfileIcon, BurgerIcon, ListIcon, } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';

class AppHeader extends React.Component {
    render() {
        return (
            <header className={`pb-4 pt-4 ${styles.header}`}>
                <nav className={`pl-5 pr-5 ${styles.nav}`}>
                    <button className={`pr-2 ${styles.button}`} >
                        <BurgerIcon type="primary" />
                        <span className="pl-2 text text_type_main-default text_color_primary">Конструктор</span>
                    </button>
                    <button className={` ${styles.button}`}>
                        <ListIcon type="secondary" />
                        <span className="pl-2 text text_type_main-default text_color_inactive ">Лента заказов</span>
                    </button>
                </nav>
                <Logo />
                <button className={`pl-5 pr-5 ${styles.button}`}>
                    <ProfileIcon type="secondary" />
                    <span className="pl-2 text text_type_main-default text_color_inactive " >Личный кабинет</span>
                </button>
            </header>
        );
    }
}

export default AppHeader;