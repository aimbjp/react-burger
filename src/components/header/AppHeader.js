import React from 'react';
import { Logo, ProfileIcon, BurgerIcon, ListIcon, } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';

class AppHeader extends React.Component {
    render() {
        return (
            <header className={`pb-4 pt-4 ${styles.header}`}>
                <nav className={`pl-5 pr-5 ${styles.nav}`}>
                    <a className={`pr-2 ${styles.a}`} href="#" >
                        <BurgerIcon type="primary" />
                        <span className="pl-2 text text_type_main-default text_color_primary">Конструктор</span>
                    </a>
                    <a className={` ${styles.a}`} href="#" >
                        <ListIcon type="secondary" />
                        <span className="pl-2 text text_type_main-default text_color_inactive ">Лента заказов</span>
                    </a>
                </nav>
                <Logo />
                <a className={`pl-5 pr-5 ${styles.a}`} href="#" >
                    <ProfileIcon type="secondary" />
                    <span className="pl-2 text text_type_main-default text_color_inactive " >Личный кабинет</span>
                </a>
            </header>
        );
    }
}

export default AppHeader;