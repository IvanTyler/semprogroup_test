import Image from "next/image";
import { FC } from "react";
import styles from "./Ellipse.module.scss";
import { clsx } from "clsx";

interface EllipseProps {
    className?: string;
}

export const Ellipse: FC<EllipseProps> = ({ className }) => (
    <div className={clsx(styles.ellipse, className)}>
        <Image
            src="/icon/sign.svg"
            alt=""
            width={41}
            height={58}
            className={styles.ellipse__icon}
        />
    </div>
);
