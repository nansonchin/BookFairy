// src/features/runway/animation/createFinaleTimeline.ts
// 收尾：所有书排成一行，光晕回到品牌绿。书排是真实的按钮，可以点击。

import { gsap } from "gsap";
import { FINALE, LOOK, WALL } from "./runwayTiming";

type FinaleInput = {
  readonly text: HTMLElement;
  readonly items: readonly HTMLElement[];
  readonly wall: readonly HTMLElement[];
  readonly stage: HTMLElement;
  readonly spotlight: { readonly from: string; readonly to: string };
};

export type FinaleTimeline = {
  readonly timeline: gsap.core.Timeline;
  readonly lineupTime: number;
};

export function createFinaleTimeline({ text, items, wall, stage, spotlight }: FinaleInput): FinaleTimeline {
  const timeline = gsap.timeline({ defaults: { ease: "none" } });
  const lineupTime = FINALE.itemLead + FINALE.itemRise + (items.length - 1) * FINALE.stagger;

  timeline.fromTo(
    stage,
    { "--spotlight": spotlight.from },
    { "--spotlight": spotlight.to, duration: FINALE.text, immediateRender: false },
    0
  );

  // 等最后一本书的书墙格子「熄灭」完（正好是 LOOK.overlap 之后）再统一提亮，避免两个动画抢同一个属性
  timeline.to(wall, { opacity: WALL.finale, duration: FINALE.text }, LOOK.overlap);

  timeline.fromTo(text, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: FINALE.text, ease: "power2.out" }, 0);
  timeline.fromTo(
    items,
    { y: 90, opacity: 0, rotationX: -30 },
    { y: 0, opacity: 1, rotationX: 0, duration: FINALE.itemRise, stagger: FINALE.stagger, ease: "power3.out" },
    FINALE.itemLead
  );

  timeline.to({}, { duration: FINALE.hold }, lineupTime);

  return { timeline, lineupTime };
}
