// src/features/runway/animation/createLookTimeline.ts

import { gsap } from "gsap";
import { LOOK, POSE, RIBBON, WALK } from "./runwayTiming";

export type LookElements = {
  readonly book: HTMLElement;
  readonly caption: HTMLElement;
  readonly polaroid: HTMLElement;
  readonly ribbonPaths: readonly SVGPathElement[];
};

type LookTimelineInput = {
  readonly elements: LookElements;
  readonly flash: HTMLElement;
  readonly stage: HTMLElement;
  readonly spotlight: { readonly from: string; readonly to: string };
};

export type LookTimeline = {
  readonly timeline: gsap.core.Timeline;
  readonly poseTime: number;
  readonly landedTime: number;
};

export function createLookTimeline({
  elements,
  flash,
  stage,
  spotlight,
}: LookTimelineInput): LookTimeline {
  const { book, caption, polaroid, ribbonPaths } = elements;
  const timeline = gsap.timeline({ defaults: { ease: "none" } });

  const poseAt = LOOK.enter;
  const flashAt = poseAt + LOOK.pose;
  const landedAt = flashAt + LOOK.flash;
  const exitAt = landedAt + LOOK.hold;

  timeline.fromTo(
    book,
    { z: WALK.startZ },
    { z: 0, duration: LOOK.enter, ease: "power1.out" },
    0,
  );
  timeline.fromTo(
    book,
    { opacity: 0 },
    { opacity: 1, duration: LOOK.enter * 0.3 },
    0,
  );
  timeline.fromTo(
    book,
    { rotationZ: -WALK.swayDegrees },
    {
      rotationZ: WALK.swayDegrees,
      duration: LOOK.enter / WALK.strides,
      repeat: WALK.strides - 1,
      yoyo: true,
      ease: "sine.inOut",
    },
    0,
  );
  timeline.fromTo(
    stage,
    { "--spotlight": spotlight.from },
    {
      "--spotlight": spotlight.to,
      duration: LOOK.enter,
      immediateRender: false,
    },
    0,
  );

  timeline.to(
    book,
    {
      rotationZ: 0,
      rotationY: POSE.turnDegrees,
      scale: POSE.scale,
      duration: LOOK.pose / 2,
      ease: "power2.inOut",
    },
    poseAt,
  );
  timeline.to(
    book,
    {
      rotationY: -POSE.turnDegrees / 2,
      duration: LOOK.pose / 2,
      ease: "power2.inOut",
    },
    poseAt + LOOK.pose / 2,
  );
  timeline.fromTo(
    caption,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: LOOK.pose * 0.6, ease: "power2.out" },
    poseAt,
  );

  const slot = RIBBON.duration / ribbonPaths.length;
  ribbonPaths.forEach((path, index) => {
    const length = path.getTotalLength();
    timeline.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length + 2 }, // +2 避免圆头线帽在起点留下一个小点
      {
        strokeDasharray: length,
        strokeDashoffset: 0,
        duration: slot,
        ease: "power1.inOut",
      },
      poseAt + RIBBON.delay + index * slot,
    );
  });

  timeline.fromTo(
    flash,
    { opacity: 0 },
    { opacity: 0.85, duration: LOOK.flash * 0.3, immediateRender: false },
    flashAt,
  );
  timeline.to(
    flash,
    { opacity: 0, duration: LOOK.flash * 0.7, ease: "power1.in" },
    flashAt + LOOK.flash * 0.3,
  );
  timeline.fromTo(
    polaroid,
    { opacity: 0, y: 40, rotation: -8, scale: 0.88 },
    {
      opacity: 1,
      y: 0,
      rotation: -3,
      scale: 1,
      duration: LOOK.flash + 0.2,
      ease: "back.out(1.6)",
    },
    flashAt,
  );

  timeline.to(
    book,
    {
      rotationY: 70,
      xPercent: 160,
      z: -300,
      opacity: 0,
      duration: LOOK.exit,
      ease: "power2.in",
    },
    exitAt,
  );
  timeline.to(
    caption,
    { opacity: 0, y: -16, duration: LOOK.exit * 0.5, ease: "power1.in" },
    exitAt,
  );
  timeline.to(
    polaroid,
    { opacity: 0, y: -20, duration: LOOK.exit * 0.5, ease: "power1.in" },
    exitAt,
  );

  return {
    timeline,
    poseTime: poseAt + LOOK.pose / 2,
    landedTime: landedAt + LOOK.hold / 2,
  };
}
