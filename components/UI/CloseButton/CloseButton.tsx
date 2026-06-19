import { FC } from "react";
import { clsx } from "clsx";
import styles from "./CloseButton.module.scss";

interface CloseButtonProps {
    onClick: () => void;
    className?: string;
    "aria-label"?: string;
}

export const CloseButton: FC<CloseButtonProps> = ({
    onClick,
    className,
    "aria-label": ariaLabel = "Закрыть",
}) => (
    <button className={clsx(styles.closeButton, className)} onClick={onClick} aria-label={ariaLabel}>
        <span className={styles.closeButton__line} />
        <span className={styles.closeButton__line} />
    </button>
);
