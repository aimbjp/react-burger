import styles from '../user-auth/forms.module.css';
import {ProfileNav} from "../../components/profile/profile-navigation";
import {ReactNode} from "react";



export default function ProfilePage({ element }: { element: ReactNode }) {
    return (
        <main className={`text text_type_main-default ${styles.profile_main}`}>
            <ProfileNav />
            {element}
        </main>
    );
}