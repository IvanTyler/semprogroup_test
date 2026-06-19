"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CloseButton } from "@/components/UI/CloseButton/CloseButton";
import { VideoControls } from "@/components/UI/VideoControls/VideoControls";
import styles from "./VideoModal.module.scss";

const VIDEO_SRC = "https://api.5-ve.ru/upload/video/Mantera_promo_768.mp4";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VideoModal: FC<VideoModalProps> = ({ isOpen, onClose }) => {
    const [mounted, setMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(true);

    const nodeRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (isOpen) {
            video.currentTime = 0;
            video.play().catch(() => {});
            setIsPlaying(true);
        } else {
            video.pause();
            video.currentTime = 0;
            setIsPlaying(false);
            setCurrentTime(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === " ") { e.preventDefault(); togglePlay(); }
        };
        if (isOpen) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handleFsChange);
        return () => document.removeEventListener("fullscreenchange", handleFsChange);
    }, []);

    const showControls = useCallback(() => {
        setControlsVisible(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000);
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) { video.play().catch(() => {}); setIsPlaying(true); }
        else { video.pause(); setIsPlaying(false); }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    const toggleFullscreen = () => {
        const container = nodeRef.current;
        if (!container) return;
        if (!document.fullscreenElement) container.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const bar = progressRef.current;
        if (!video || !bar) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        video.currentTime = ratio * video.duration;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;
        video.volume = Number(e.target.value);
        setIsMuted(video.volume === 0);
    };

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
            <div ref={nodeRef} className={styles.videoModal} onMouseMove={showControls}>
                <video
                    ref={videoRef}
                    className={styles.videoModal__video}
                    src={VIDEO_SRC}
                    loop
                    playsInline
                    preload="auto"
                    onClick={togglePlay}
                    onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
                    onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />

                <CloseButton onClick={onClose} className={styles.videoModal__close} />

                <VideoControls
                    isPlaying={isPlaying}
                    isMuted={isMuted}
                    currentTime={currentTime}
                    duration={duration}
                    isFullscreen={isFullscreen}
                    visible={controlsVisible}
                    progressRef={progressRef}
                    onTogglePlay={togglePlay}
                    onToggleMute={toggleMute}
                    onToggleFullscreen={toggleFullscreen}
                    onProgressClick={handleProgressClick}
                    onVolumeChange={handleVolumeChange}
                />
            </div>
        </CSSTransition>,
        document.body
    );
};
