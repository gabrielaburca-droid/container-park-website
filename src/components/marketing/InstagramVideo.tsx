"use client";

import { useEffect, useRef } from "react";

interface InstagramVideoProps {
  src: string;
  className?: string;
}

// The one video tile in marketing/InstagramStrip.tsx. Fills its parent
// tile exactly like the photo tiles' <Image fill> does, so it never
// affects layout. Muted/looping/inline with no controls, so it reads as
// just another tile; the tile's own link stays the click target.
//
// Deliberately NOT the `autoPlay` attribute: the strip sits at the bottom
// of nearly every page, and `autoPlay` would make the browser download the
// whole file on page load. preload="metadata" only fetches enough to paint
// the first frame; playback (and the real download) starts only once the
// tile is actually scrolled into view, and pauses again when it leaves.
// Stays a still first frame for visitors who prefer reduced motion.
export function InstagramVideo({ src, className = "" }: InstagramVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Rejected play() (e.g. a browser's data-saver mode) just leaves
          // the still first frame in place.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      // The #t media fragment makes iOS Safari paint the first frame
      // instead of a blank tile before playback starts.
      src={`${src}#t=0.001`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 h-full w-full object-cover ${className}`.trim()}
    />
  );
}
