import { FC, ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./SectionLabel.module.scss";

interface SectionLabelProps {
    children: ReactNode;
    className?: string;
}

export const SectionLabel: FC<SectionLabelProps> = ({ children, className }) => (
    <span className={clsx(styles.sectionLabel, className)}>{children}</span>
);
