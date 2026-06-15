import { FC, ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./SlideText.module.scss";

interface SlideTextProps {
    children: ReactNode;
    animated?: boolean;
    className?: string;
}

export const SlideText: FC<SlideTextProps> = ({ children, animated, className }) => {
    return (
        <span className={clsx(styles.slideText__wrapper, className)}>
            <span
                className={clsx(
                    styles.slideText__content,
                    animated && styles.slideText__contentAnimated,
                )}
            >
                <span>{children}</span>
                <span aria-hidden="true">{children}</span>
            </span>
        </span>
    );
};
