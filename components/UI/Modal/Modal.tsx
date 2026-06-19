"use client";

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CloseButton } from "@/components/UI/CloseButton/CloseButton";
import styles from "./Modal.module.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [mounted, setMounted] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!mounted) return null;

    return createPortal(
        <CSSTransition
            nodeRef={nodeRef}
            in={isOpen}
            timeout={300}
            classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
            unmountOnExit
        >
            <div ref={nodeRef} className={styles.modal}>
                <CloseButton onClick={onClose} className={styles.modal__close} />
                {children}
            </div>
        </CSSTransition>,
        document.body
    );
};
