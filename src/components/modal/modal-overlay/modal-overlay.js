import styles from './modal-overlay.module.css';

export default function ModalOverlay({ children, onClick }) {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    );
}
