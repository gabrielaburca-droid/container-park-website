"use client";

import { useState } from "react";
import Image from "next/image";
import { VideoModal } from "./VideoModal";

interface VideoPlayerProps {
  videoUrl?: string;
  title?: string;
  onPlay?: () => void;
  className?: string;
}

// Just the play-button control now — the poster/background image is a
// section-level concern (see home/VideoFeature.tsx, which renders it
// full-bleed behind this button rather than this component owning a
// small boxed poster+button unit).
//
// The circular "PLAY VIDEO" text is the real provided asset
// (public/assets/images/all/play-btn-text.svg), not recreated with
// CSS/text — it rotates slowly and continuously while hovered (see the
// spin-slow keyframe in globals.css; a plain `transition` can't loop).
// The inner circle + triangle stay completely static, per spec — only
// the surrounding ring rotates.
//
// Clicking opens a real modal/lightbox video player (see VideoModal). If
// `onPlay` is supplied, that runs instead (e.g. for a future
// inline/external-link behavior) — otherwise the modal is the default.
// When no `videoUrl` is configured, the modal still opens but shows an
// explicit "video not yet available" state rather than a silent no-op or
// a guessed source.
export function VideoPlayer({ videoUrl, title = "Video", onPlay, className = "" }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    if (onPlay) {
      onPlay();
      return;
    }
    setIsOpen(true);
  }

  return (
    <>
      {/* The whole component — clickable area AND the ring's bounding box —
          is 90px mobile / 120px tablet / 150px desktop, per spec. The ring
          image uses `fill` + object-contain (not fixed width/height) so it
          scales to whatever the component size is at each breakpoint
          without Next/Image ever comparing a fixed intrinsic ratio against
          a differently-shaped rendered box (the mismatch warning this
          tripped previously) — object-contain also means the asset's own
          148:144 shape is never stretched, just centered within the
          square. The 70/90/110px circle is centered on top via absolute
          inset-0 + m-auto, independent of the ring's own sizing. */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Play video: ${title}`}
        className={`group relative h-[90px] w-[90px] sm:h-[120px] sm:w-[120px] lg:h-[150px] lg:w-[150px] ${className}`.trim()}
      >
        <Image
          src="/assets/images/all/play-btn-text.svg"
          alt=""
          fill
          className="object-contain group-hover:[animation:spin-slow_6s_linear_infinite]"
        />
        {/* Circle: 70px mobile / 90px tablet / 110px desktop, per spec,
            centered inside the component regardless of its size. Triangle
            scales proportionally (same ratio to the circle at every
            breakpoint). */}
        <span
          aria-hidden="true"
          className="absolute inset-0 z-10 m-auto flex h-[70px] w-[70px] items-center justify-center rounded-full border border-white sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-0.5 h-[22px] w-[22px] sm:h-[28px] sm:w-[28px] lg:h-[34px] lg:w-[34px]"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoUrl={videoUrl}
        title={title}
      />
    </>
  );
}
