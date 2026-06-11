import type { ReactNode } from "react";

/**
 * Red brush-slash underline behind one key word per major headline.
 * Inline SVG, echoing the brush highlight on the client's posters.
 */
export default function Slashed({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full text-brand"
        viewBox="0 0 200 16"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M4 12 C 55 5, 130 4, 196 8"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M10 14 C 70 9, 140 8, 190 11"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />
      </svg>
    </span>
  );
}
