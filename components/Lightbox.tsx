"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/data";

interface LightboxProps {
  items: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

/**
 * Full-screen lightbox on a native <dialog>: modal focus containment,
 * Escape closes, arrow keys navigate.
 */
export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function onKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (index === null || items.length === 0) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNavigate((index + 1) % items.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onNavigate((index - 1 + items.length) % items.length);
    }
  }

  const current = index !== null ? items[index] : null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-label="Gallery photo viewer"
      className="m-auto w-[min(92vw,56rem)] bg-transparent p-0"
    >
      {current ? (
        <div className="relative">
          <div className="flex aspect-[4/3] max-h-[75vh] w-full items-center justify-center rounded-lg border border-line bg-surface">
            <span className="max-w-md px-6 text-center text-sm leading-relaxed text-muted">
              {current.label} ({current.alt})
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-bright">{current.alt}</p>
            <p className="shrink-0 text-xs text-muted">
              {(index ?? 0) + 1} of {items.length}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute -top-3 right-3 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full bg-surface text-white ring-1 ring-line transition-colors hover:bg-brand"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => index !== null && onNavigate((index - 1 + items.length) % items.length)}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-white ring-1 ring-line transition-colors hover:bg-brand"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => index !== null && onNavigate((index + 1) % items.length)}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-white ring-1 ring-line transition-colors hover:bg-brand"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </dialog>
  );
}
