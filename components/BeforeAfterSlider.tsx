"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  /** Accessible description of the comparison. */
  label: string;
  /** Visible placeholder note until client photos + written consent arrive. */
  todoLabel: string;
}

/**
 * Before/after comparison: pointer-draggable divider, keyboard accessible.
 * Currently renders consent-gated placeholder panels; drop two stacked
 * next/image elements into the layers once real photos are approved.
 */
export default function BeforeAfterSlider({ label, todoLabel }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (dragging.current) setFromClientX(event.clientX);
  }

  function endDrag() {
    dragging.current = false;
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    let next: number | null = null;
    if (event.key === "ArrowLeft") next = position - 5;
    else if (event.key === "ArrowRight") next = position + 5;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 100;
    if (next !== null) {
      event.preventDefault();
      setPosition(Math.min(100, Math.max(0, next)));
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] touch-none select-none overflow-hidden rounded-lg border border-line bg-surface"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* Before layer */}
      <div className="absolute inset-0 flex items-center justify-center bg-surface">
        <span className="max-w-[80%] px-4 text-center text-xs leading-relaxed text-muted">
          Before photo. {todoLabel}
        </span>
      </div>

      {/* After layer, revealed by the divider */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
          <span className="max-w-[80%] px-4 text-center text-xs leading-relaxed text-muted-bright">
            After photo. {todoLabel}
          </span>
        </div>
      </div>

      <span className="absolute left-3 top-3 rounded bg-ink/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded bg-ink/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        After
      </span>

      {/* Divider + handle */}
      <div className="absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-brand" aria-hidden="true" />
        <button
          type="button"
          role="slider"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`Divider at ${Math.round(position)} percent`}
          onKeyDown={onKeyDown}
          className="absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white"
        >
          <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
