import { FC } from "react";
import { clsx } from "clsx";
import styles from "./Container.module.scss";

interface IContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: FC<IContainerProps> = ({ children, className }) => (
    <div className={clsx(styles.container, className)}>
        {children}
    </div>
);
