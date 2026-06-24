import { FC } from "react";

interface PictureSource {
    media: string;
    srcSet: string;
}

interface PictureProps {
    sources: PictureSource[];
    src: string;
    alt?: string;
    className?: string;
    imgClassName?: string;
}

export const Picture: FC<PictureProps> = ({
    sources,
    src,
    alt = "",
    className,
    imgClassName,
}) => (
    <picture className={className}>
        {sources.map((source) => (
            <source key={source.media} media={source.media} srcSet={source.srcSet} />
        ))}
        <img src={src} alt={alt} className={imgClassName} />
    </picture>
);
