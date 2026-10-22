// src/features/runway/animation/createIntroTimeline.ts

import { gsap } from "gsap";
import { INTRO } from "./runwayTiming";

type IntroInput = {
  readonly title: HTMLElement;
};

export function createIntroTimeline({ title }: IntroInput): gsap.core.Timeline {
  const timeline = gsap.timeline({ defaults: { ease: "none" } });

  timeline.fromTo(
    title,
    { autoAlpha: 1, yPercent: 0 },
    { autoAlpha: 0, yPercent: -12, duration: INTRO.fade, ease: "power1.in" },
    INTRO.delay
  );

  return timeline;
}
