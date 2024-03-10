import styles from './modal-overlay.module.css';
import { FC } from "react";
import {IModalOverlayProps} from "../types-modal";

const ModalOverlay: FC<IModalOverlayProps> =  ({ children, onClick }) => {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    );
}

export default ModalOverlay;
