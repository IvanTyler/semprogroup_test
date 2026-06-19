"use client";

import { FC, ReactNode, useState } from "react";
import { clsx } from "clsx";
import styles from "./FloatingField.module.scss";

interface FloatingFieldProps {
    label: string;
    error?: string;
    hasValue: boolean;
    className?: string;
    children: (props: { focused: boolean }) => ReactNode;
}

export const FloatingField: FC<FloatingFieldProps> = ({
    label,
    error,
    hasValue,
    className,
    children,
}) => {
    const [focused, setFocused] = useState(false);
    const isFloated = focused || hasValue;

    return (
        <div
            className={clsx(styles.floatingField, className)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        >
            <label className={clsx(styles.floatingField__label, isFloated && styles["floatingField__label--float"])}>
                {label}
            </label>
            {children({ focused })}
            {error && <span className={styles.floatingField__error}>{error}</span>}
        </div>
    );
};
