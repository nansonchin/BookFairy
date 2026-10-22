// src/features/runway/animation/createIntroTimeline.ts

import { gsap } from "gsap";
import { INTRO } from "./runwayTiming";

type IntroInput = {
  readonly left: HTMLElement;
  readonly right: HTMLElement;
  readonly title: HTMLElement;
};

export function createIntroTimeline({ left, right, title }: IntroInput): gsap.core.Timeline {
  const timeline = gsap.timeline({ defaults: { ease: "none" } });
  const open = INTRO.curtain;

  timeline.fromTo(title, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, duration: open * 0.4, ease: "power1.in" }, 0);
  timeline.fromTo(left, { xPercent: 0 }, { xPercent: -101, duration: open, ease: "power2.inOut" }, open * 0.15);
  timeline.fromTo(right, { xPercent: 0 }, { xPercent: 101, duration: open, ease: "power2.inOut" }, open * 0.15);

  return timeline;
}