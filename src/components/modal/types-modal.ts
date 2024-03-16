import { MouseEvent, ReactElement } from "react";

export interface IModalOverlayProps {
    children?: ReactElement;
    onClick: (e: MouseEvent<HTMLDivElement>) => void; // Обновленный тип для обработчика клика
}