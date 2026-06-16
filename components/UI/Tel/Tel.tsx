"use client";

import { FC } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import styles from "./Tel.module.scss";

interface TelProps {
    isIcon?: boolean;
    className?: string;
}

export const Tel: FC<TelProps> = ({ isIcon = false, className }) => {
    return (
        <a
            href="tel:+74955272121"
            className={clsx(styles.tel, isIcon && styles.telCircle, className)}
        >
            {isIcon ? (
                <Image
                    src="/icon/phone.svg"
                    alt="Позвонить"
                    width={14}
                    height={14}
                    className={styles.tel__icon}
                />
            ) : (
                <span className={styles.tel__text}>+7 495 527 21 21</span>
            )}
        </a>
    );
};
