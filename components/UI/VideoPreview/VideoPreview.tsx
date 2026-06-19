"use client";

import { FC, useState } from "react";
import { clsx } from "clsx";
import { VideoModal } from "@/components/UI/VideoModal/VideoModal";
import styles from "./VideoPreview.module.scss";

interface VideoPreviewProps {
    className?: string;
}

export const VideoPreview: FC<VideoPreviewProps> = ({ className }) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
            <div className={clsx(styles.videoPreview, className)} onClick={() => setIsVideoOpen(true)}>
                <div className={styles.videoPreview__wrapper}>
                    <span className={styles.videoPreview__text}>видео о проекте</span>
                    <span className={styles.videoPreview__time}>1:25 минут</span>
                </div>
                <div className={styles.videoPreview__line}></div>
                <div className={styles.videoPreview__circle}>
                    <img src="/img/home-3.png" alt="" className={styles.videoPreview__img} />
                    <div className={styles.videoPreview__overlay}></div>
                    <div className={styles.videoPreview__play}>
                        <div className={styles.videoPreview__playRing}>
                            <img
                                src="/icon/play.svg"
                                alt=""
                                width={7}
                                height={8}
                                className={styles.videoPreview__playIcon}
                            />
                            <span className={styles.videoPreview__playText}>play</span>
                        </div>
                    </div>
                </div>
            </div>

            <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
        </>
    );
};
