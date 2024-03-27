import styles from "../../pages/user-auth/forms.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import getClasses from "../../utils/functions/getClassesColor";
import {logout} from "../../services/thunk/user";
import {useDispatch} from "../../services/hooks";
import {isActivePath} from "../../utils/functions/paths";


export function ProfileNav () {
    const dispatch = useDispatch();
    const location = useLocation();
    const handleExit = () => {
        dispatch(logout(JSON.stringify({token: localStorage.getItem("refreshToken")})));
    }


    return (
        <section className={styles.menu}>
            <nav className={`text_type_main-medium ${styles.navigation}`}>
                <NavLink
                    to='/profile'
                >
                    {() => {
                        const isActive = isActivePath(location.pathname, '/profile')
                       return( <Button htmlType="button" type="secondary" size="large"
                                extraClass={getClasses(`text text_type_main-medium ${styles.navigation_item}`, isActive)}>
                            <span>Профиль</span>
                        </Button>
                       )
                    }
                    }
                </NavLink>
                <NavLink
                    to='/profile/orders'
                >
                    {() => {
                        const isActive = isActivePath(location.pathname, '/profile/orders')
                        return(
                           <Button htmlType="button" type="secondary" size="large"
                                extraClass={getClasses(`text text_type_main-medium ${styles.navigation_item}`, isActive)}>
                            <span>История заказов</span>
                            </Button>
                         )
                        }
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
        </section>)
}