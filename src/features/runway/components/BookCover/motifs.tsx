// src/features/runway/components/BookCover/motifs.tsx
// 责任：只负责「6 种图案各自怎么画」。不知道书名、颜色或排版。

import type { ReactElement } from "react";
import type { CoverMotif } from "../../domain/runwaySchema";

const range = (count: number): number[] => Array.from({ length: count }, (_, index) => index);

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinejoin: "round",
} as const;

function Rings() {
  return (
    <g {...line}>
      {range(5).map((i) => (
        <circle key={i} cx={100} cy={100} r={18 + i * 18} />
      ))}
      <circle cx={100} cy={100} r={7} fill="currentColor" stroke="none" />
    </g>
  );
}

function Waves() {
  return (
    <g {...line}>
      {range(8).map((i) => {
        const y = 40 + i * 20;
        return (
          <path key={i} d={`M-10 ${y} Q15 ${y - 14} 40 ${y} T90 ${y} T140 ${y} T190 ${y} T240 ${y}`} />
        );
      })}
    </g>
  );
}

function Stripes() {
  return (
    <g fill="currentColor">
      {range(7).map((i) => {
        const x = -100 + i * 48;
        return <polygon key={i} points={`${x},200 ${x + 24},200 ${x + 124},0 ${x + 100},0`} />;
      })}
    </g>
  );
}

const MOON_STARS = [
  [150, 100, 3],
  [170, 66, 2],
  [174, 138, 2.5],
  [30, 160, 2],
] as const;

function Moon() {
  return (
    <g fill="currentColor">
      <path transform="translate(40 0)" d="M120 50 A80 80 0 1 0 120 190 A110 110 0 0 1 120 50 Z" />
      {MOON_STARS.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
    </g>
  );
}

function Dots() {
  return (
    <g fill="currentColor">
      {range(9).flatMap((row) =>
        range(9).map((col) => (
          <circle key={`${row}-${col}`} cx={12 + col * 22} cy={12 + row * 22} r={1.2 + row * 0.85} />
        ))
      )}
    </g>
  );
}

function Diamonds() {
  return (
    <g {...line}>
      {range(5).map((i) => {
        const k = 18 + i * 18;
        return <polygon key={i} points={`100,${100 - k} ${100 + k},100 100,${100 + k} ${100 - k},100`} />;
      })}
      <polygon points="100,88 112,100 100,112 88,100" fill="currentColor" stroke="none" />
    </g>
  );
}

export const MOTIF_ART: Record<CoverMotif, () => ReactElement> = {
  rings: Rings,
  waves: Waves,
  stripes: Stripes,
  moon: Moon,
  dots: Dots,
  diamonds: Diamonds,
};