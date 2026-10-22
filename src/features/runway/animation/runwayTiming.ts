// src/features/runway/animation/runwayTiming.ts
// 所有时间/距离常量集中在这里。单位：timeline 秒（不是真实秒，滚动会拉伸它）。

export const INTRO = {
  delay: 0.3,
  fade: 0.8,
  overlap: 0.6, // 第一本书比标题淡出提前多久开始
} as const;

export const LOOK = {
  enter: 1.4,
  hold: 1.0,
  exit: 1.0,
  overlap: 0.7, // 下一本书提前开始的时间
} as const;

export const WALK = {
  startZ: -1500,
  startY: 60,
  startTurn: -28,
  poseTurn: -9,
  holdTurn: -3,
  exitZ: 520,
} as const;

export const RIBBON = {
  delay: 0.1,
  duration: 0.75,
} as const;

// 背景书墙的透明度。dim 必须和 BookWall.scss 里的 opacity 一致。
export const WALL = {
  dim: 0.12,
  lit: 0.55,
  finale: 0.22,
} as const;

export const FINALE = {
  text: 0.7,
  itemRise: 0.9,
  itemLead: 0.2,
  stagger: 0.12,
  hold: 0.8,
} as const;

export const SCROLL_VH_PER_UNIT = 30;
