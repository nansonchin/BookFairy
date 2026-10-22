// src/features/runway/animation/runwayTiming.ts

export const INTRO = {
  curtain: 1.6,
  overlap: 0.8,
} as const;

export const LOOK = {
  enter: 1.4,
  pose: 1.0,
  flash: 0.3,
  hold: 0.4,
  exit: 1.0,
  overlap: 0.7,
} as const;

export const WALK = {
  startZ: -1400,
  swayDegrees: 2.5,
  strides: 4,
} as const;

export const POSE = {
  turnDegrees: 14,
  scale: 1.04,
} as const;

export const RIBBON = {
  delay: 0.1,
  duration: 0.75,
} as const;

export const FINALE = {
  walkIn: 1.4,
  stagger: 0.18, 
  gap: 1.1, 
  maxScale: 0.55, 
  textLead: 0.8, 
  photoDelay: 0.15,
  flash: 0.3,
  hold: 1.2,
} as const;

export const SCROLL_VH_PER_UNIT = 35;
