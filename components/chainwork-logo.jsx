import { cn } from "@/lib/utils";

/**
 * The interlocking-hexagon mark. Colors are pinned to the brand tokens rather
 * than `currentColor` so the mark stays violet on both the dark panel and the
 * light mobile background.
 *
 * The interlock is drawn without a <mask> (which would need a document-unique
 * id, and this renders twice per page): both hexagons are stroked with the
 * upper one on top, then the short segment of the lower hexagon's left edge is
 * redrawn last so it crosses back over. Two crossings, opposite stacking —
 * which is what reads as a chain link.
 */
function ChainWorkMark({ className }) {
  return (
    <svg
      viewBox="2 2 40 40"
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-9 shrink-0", className)}
    >
      {/* lower-right hexagon */}
      <path
        d="M30 17 L39.526 22.5 L39.526 33.5 L30 39 L20.474 33.5 L20.474 22.5 Z"
        stroke="var(--brand)"
      />
      {/* upper-left hexagon, stacked above */}
      <path
        d="M18 5 L27.526 10.5 L27.526 21.5 L18 27 L8.474 21.5 L8.474 10.5 Z"
        stroke="var(--brand-accent)"
      />
      {/* re-crossing segment: lower hexagon passes back over the upper one */}
      <path d="M20.474 22.6 L20.474 28.6" stroke="var(--brand)" />
      <circle cx="6.2" cy="28.4" r="2.4" fill="var(--brand-accent)" stroke="none" />
    </svg>
  );
}

/**
 * Full lockup: mark + wordmark. "Chain" inherits `currentColor` so the parent
 * controls it per background (white on the dark panel, near-black on mobile);
 * "Work" is always brand violet.
 */
export function ChainWorkLogo({ className, markClassName, textClassName }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <ChainWorkMark className={markClassName} />
      <span
        className={cn(
          "text-2xl font-semibold tracking-tight leading-none",
          textClassName
        )}
      >
        Chain<span className="text-brand-accent">Work</span>
      </span>
    </div>
  );
}

export { ChainWorkMark };
