"use client";

import { useEffect, useRef, type TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

export interface LightboxImage {
  url: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  /** Index into `images` to open on, or null when closed. Opening
   * directly at a given index (not always index 0) is the whole point —
   * see MediaGallery.tsx, which passes the exact tile that was clicked. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  title: string;
}

// Real image lightbox/gallery popup — one modal shared across every photo
// in the gallery (not a per-tile instance), so Previous/Next can move
// between all of them while staying open. Same dialog/Escape/focus
// pattern as VideoModal.tsx, extended with left/right navigation
// (buttons, arrow keys, and touch swipe) and a short crossfade between
// images. Video tiles are NOT part of this — they keep opening VideoModal
// directly, unchanged (see MediaGallery.tsx).
const SWIPE_THRESHOLD_PX = 40;

export function ImageLightbox({ images, index, onClose, onNavigate, title }: ImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = index !== null;
  const current = index !== null ? images[index] : null;
  const hasPrev = index !== null && index > 0;
  const hasNext = index !== null && index < images.length - 1;

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasPrev && index !== null) onNavigate(index - 1);
      if (event.key === "ArrowRight" && hasNext && index !== null) onNavigate(index + 1);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNavigate, hasPrev, hasNext, index]);

  if (!isOpen || !current || index === null) return null;

  function handleTouchStart(event: TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: TouchEvent) {
    if (touchStartX.current === null || index === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    // Swipe left (negative delta) -> next; swipe right -> previous.
    if (delta < 0 && hasNext) onNavigate(index + 1);
    else if (delta > 0 && hasPrev) onNavigate(index - 1);
  }

  const arrowButtonClasses =
    "flex h-11 w-11 shrink-0 items-center justify-center border border-white text-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-3xl items-center gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => index !== null && onNavigate(index - 1)}
          disabled={!hasPrev}
          aria-label="Previous image"
          className={`${arrowButtonClasses} hidden sm:flex`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <div className="relative w-full">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center border border-white text-white"
          >
            <span aria-hidden="true">✕</span>
          </button>

          <div
            className="relative aspect-[4/3] w-full overflow-hidden bg-near-black"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* key={index} remounts on every navigation, which is what
                (re)starts the fade-in keyframe from scratch each time —
                see the note on @keyframes fade-in in globals.css for why
                this is a plain animation, not a transition+state toggle. */}
            <Image
              key={index}
              src={current.url}
              alt={current.alt}
              fill
              className="object-contain [animation:fade-in_300ms_ease-out]"
            />
          </div>

          {/* Mobile: buttons hidden (arrows sit outside the frame at
              sm:+); swipe is the primary nav here, this row is a visible,
              tappable fallback covering the same actions. */}
          <div className="mt-3 flex items-center justify-between sm:hidden">
            <button
              type="button"
              onClick={() => index !== null && onNavigate(index - 1)}
              disabled={!hasPrev}
              aria-label="Previous image"
              className={arrowButtonClasses}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-xs text-white/70">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => index !== null && onNavigate(index + 1)}
              disabled={!hasNext}
              aria-label="Next image"
              className={arrowButtonClasses}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => index !== null && onNavigate(index + 1)}
          disabled={!hasNext}
          aria-label="Next image"
          className={`${arrowButtonClasses} hidden sm:flex`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
