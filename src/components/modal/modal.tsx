import React, {FC, MouseEvent, ReactElement, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

type TModal = {
    title: string;
    onClose: () => void;
    children?: ReactElement;
}

const Modal: FC<TModal> = ({ title, children, onClose }) => {
    const modalRoot: HTMLElement | null = document.getElementById('modal-root');

    function handleCloseClick (e?: MouseEvent<HTMLDivElement>) {
        e && e.stopPropagation();
        onClose();
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={handleCloseClick} />
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.header} pr-10 pl-10`}>
                    <h1 className="text text_type_main-large">{title}</h1>
                    <span data-testid="modal-close">
                    <CloseIcon type="primary" onClick={handleCloseClick} />

                    </span>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>,
        modalRoot
    );
};

export default Modal;
