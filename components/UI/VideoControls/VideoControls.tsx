import { FC, RefObject } from "react";
import { clsx } from "clsx";
import styles from "./VideoControls.module.scss";

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

interface VideoControlsProps {
    isPlaying: boolean;
    isMuted: boolean;
    currentTime: number;
    duration: number;
    isFullscreen: boolean;
    visible: boolean;
    progressRef: RefObject<HTMLDivElement | null>;
    onTogglePlay: () => void;
    onToggleMute: () => void;
    onToggleFullscreen: () => void;
    onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export const VideoControls: FC<VideoControlsProps> = ({
    isPlaying,
    isMuted,
    currentTime,
    duration,
    isFullscreen,
    visible,
    progressRef,
    onTogglePlay,
    onToggleMute,
    onToggleFullscreen,
    onProgressClick,
    onVolumeChange,
    className,
}) => (
    <div className={clsx(styles.videoControls, visible && styles.videoControls_visible, className)}>
        <div ref={progressRef} className={styles.videoControls__progress} onClick={onProgressClick}>
            <div
                className={styles.videoControls__progressFill}
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
            />
        </div>

        <div className={styles.videoControls__row}>
            <div className={styles.videoControls__left}>
                <button
                    className={styles.videoControls__btn}
                    onClick={onTogglePlay}
                    aria-label={isPlaying ? "Пауза" : "Играть"}
                >
                    {isPlaying ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="3" y="2" width="3.5" height="12" rx="1" fill="#fff" />
                            <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="#fff" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="#fff" />
                        </svg>
                    )}
                </button>

                <div className={styles.videoControls__volume}>
                    <button
                        className={styles.videoControls__btn}
                        onClick={onToggleMute}
                        aria-label={isMuted ? "Включить звук" : "Выключить звук"}
                    >
                        {isMuted ? (
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                <path d="M2 5H5.5L9 2V14L5.5 11H2V5Z" fill="#fff" />
                                <line x1="13" y1="5" x2="17" y2="11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="17" y1="5" x2="13" y2="11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                <path d="M2 5H5.5L9 2V14L5.5 11H2V5Z" fill="#fff" />
                                <path d="M12 5.5C13.2 6.3 14 7.6 14 9C14 10.4 13.2 11.7 12 12.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M14.5 3.5C16.5 4.8 18 6.8 18 9C18 11.2 16.5 13.2 14.5 14.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={1}
                        className={styles.videoControls__volumeSlider}
                        onChange={onVolumeChange}
                    />
                </div>

                <span className={styles.videoControls__time}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>

            <button
                className={styles.videoControls__btn}
                onClick={onToggleFullscreen}
                aria-label="Полный экран"
            >
                {isFullscreen ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 2V6H2M14 6H10V2M10 14V10H14M2 10H6V14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 6V2H6M10 2H14V6M14 10V14H10M6 14H2V10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </button>
        </div>
    </div>
);
