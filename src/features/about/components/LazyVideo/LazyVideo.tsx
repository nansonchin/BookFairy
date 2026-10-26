
import { useState } from "react";
import "./LazyVideo.scss";

type LazyVideoProps = {
  readonly videoId: string;
  readonly title: string;
};

export function LazyVideo({ videoId, title }: LazyVideoProps) {
  const [activated, setActivated] = useState(false);

  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  const thumbnailSrc = thumbnailFailed
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (activated) {
    return (
      <div className="lazy-video lazy-video--active">
        <iframe
          className="lazy-video__frame"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="lazy-video">
      <img
        className="lazy-video__thumb"
        src={thumbnailSrc}
        alt={`Video thumbnail: ${title}`}
        loading="lazy"
        onError={() => setThumbnailFailed(true)}
      />

      <button
        type="button"
        className="lazy-video__play"
        aria-label={`Play: ${title}`}
        onClick={() => setActivated(true)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="12" fill="currentColor" opacity="0.85" />
          <polygon points="9.5,7 19,12 9.5,17" fill="white" />
        </svg>
      </button>

      <p className="lazy-video__caption">{title}</p>
    </div>
  );
}