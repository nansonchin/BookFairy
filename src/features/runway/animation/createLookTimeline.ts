// src/features/runway/animation/createLookTimeline.ts
// 一本书的完整一幕：走近 → 停留 → 离场。没有闪光，只有景深和光色变化。

import { gsap } from "gsap";
import { LOOK, RIBBON, WALK, WALL } from "./runwayTiming";

export type LookElements = {
  readonly book: HTMLElement;
  readonly city: HTMLElement;
  readonly caption: HTMLElement;
  readonly ribbonPaths: readonly SVGPathElement[];
  readonly tiles: readonly HTMLElement[]; // 背景书墙里「同一本书」的格子
};

type LookTimelineInput = {
  readonly elements: LookElements;
  readonly stage: HTMLElement;
  readonly spotlight: { readonly from: string; readonly to: string };
};

export type LookTimeline = {
  readonly timeline: gsap.core.Timeline;
  readonly poseTime: number;
};

export function createLookTimeline({ elements, stage, spotlight }: LookTimelineInput): LookTimeline {
  const { book, city, caption, ribbonPaths, tiles } = elements;
  const timeline = gsap.timeline({ defaults: { ease: "none" } });

  const holdAt = LOOK.enter;
  const exitAt = holdAt + LOOK.hold;

  // 进场
  timeline.fromTo(
    book,
    { z: WALK.startZ, y: WALK.startY, rotationY: WALK.startTurn, opacity: 0 },
    { z: 0, y: 0, rotationY: WALK.poseTurn, opacity: 1, duration: LOOK.enter, ease: "power2.out" },
    0
  );
  timeline.fromTo(city, { x: "-30vw", opacity: 0 }, { x: 0, opacity: 1, duration: LOOK.enter, ease: "power2.out" }, 0);
  timeline.fromTo(
    stage,
    { "--spotlight": spotlight.from },
    { "--spotlight": spotlight.to, duration: LOOK.enter * 0.9, immediateRender: false },
    0
  );
  timeline.to(tiles, { opacity: WALL.lit, scale: 1.06, duration: LOOK.enter * 0.7 }, LOOK.enter * 0.2);
  timeline.fromTo(
    caption,
    { opacity: 0, y: 36 },
    { opacity: 1, y: 0, duration: LOOK.enter * 0.55, ease: "power2.out" },
    LOOK.enter * 0.65
  );

  // 停留：缎带画出来，书轻轻转正
  const slot = RIBBON.duration / ribbonPaths.length;
  ribbonPaths.forEach((path, index) => {
    const length = path.getTotalLength();
    timeline.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length + 2 }, // +2 避免圆头线帽在起点留下小点
      { strokeDasharray: length, strokeDashoffset: 0, duration: slot, ease: "power1.inOut" },
      holdAt + RIBBON.delay + index * slot
    );
  });
  timeline.to(book, { rotationY: WALK.holdTurn, duration: LOOK.hold }, holdAt);

  // 离场：朝镜头方向飞过去
  timeline.to(
    book,
    { z: WALK.exitZ, x: "-10vw", rotationY: 14, opacity: 0, duration: LOOK.exit, ease: "power2.in" },
    exitAt
  );
  timeline.to(city, { x: "-14vw", opacity: 0, duration: LOOK.exit * 1.2 }, exitAt - 0.2);
  timeline.to(caption, { y: -20, opacity: 0, duration: LOOK.exit * 0.6 }, exitAt);
  timeline.to(tiles, { opacity: WALL.dim, scale: 1, duration: LOOK.exit }, exitAt);

  return { timeline, poseTime: holdAt + LOOK.hold / 2 };
}
