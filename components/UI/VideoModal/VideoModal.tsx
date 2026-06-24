"use client";

import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CloseButton } from "@/components/UI/CloseButton/CloseButton";
import styles from "./VideoModal.module.scss";

const VIDEO_SRC = "https://api.5-ve.ru/upload/video/Mantera_promo_768.mp4";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VideoModal: FC<VideoModalProps> = ({ isOpen, onClose }) => {
    const [mounted, setMounted] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const video = videoRef.current;
        const container = nodeRef.current;
        
        if (!video) return;
        if (isOpen) {
            video.currentTime = 0;
            video.play().catch(() => {});
            container?.requestFullscreen().catch(() => {});
        } else {
            video.pause();
            video.currentTime = 0;
            if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        }
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
            timeout={400}
            classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
            unmountOnExit
        >
            <div ref={nodeRef} className={styles.videoModal}>
                <video
                    ref={videoRef}
                    className={styles.videoModal__video}
                    src={VIDEO_SRC}
                    controls
                    loop
                    playsInline
                    preload="auto"
                />
                <CloseButton onClick={onClose} className={styles.videoModal__close} />
            </div>
        </CSSTransition>,
        document.body
    );
};
