"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title: string;
}

// Real modal/lightbox video player. A `videoUrl` pointing at an actual
// video file (.mp4/.webm/.mov/.ogg) plays via a native <video> element;
// anything else is treated as an oEmbed-style embed URL (Vimeo player
// URL, YouTube embed URL, etc.) and rendered in an <iframe> — kept
// provider-agnostic so whichever kind of source gets connected just
// works. When no `videoUrl` is configured, shows an explicit "video not
// yet available" state instead of silently rendering nothing or guessing
// a source.
const VIDEO_FILE_PATTERN = /\.(mp4|webm|mov|ogg)$/i;

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center border border-white text-white"
        >
          <span aria-hidden="true">✕</span>
        </button>

        <div className="relative aspect-video w-full overflow-hidden bg-near-black">
          {videoUrl ? (
            VIDEO_FILE_PATTERN.test(videoUrl) ? (
              <video
                src={videoUrl}
                title={title}
                controls
                autoPlay
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <iframe
                src={videoUrl}
                title={title}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-white">
              <p className="font-display text-lg uppercase">Video not yet available</p>
              <p className="max-w-sm text-sm text-white/70">
                MISSING ASSET — no confirmed video URL is connected for this section yet. See the
                homepage refinement report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
