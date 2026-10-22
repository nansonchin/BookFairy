// src/features/runway/animation/createFinaleTimeline.ts

import { gsap } from "gsap";
import { FINALE } from "./runwayTiming";

type FinaleInput = {
  readonly books: readonly HTMLElement[];
  readonly text: HTMLElement;
  readonly flash: HTMLElement;
  readonly stage: HTMLElement;
  readonly spotlight: { readonly from: string; readonly to: string };
};

export type FinaleTimeline = {
  readonly timeline: gsap.core.Timeline;
  readonly lineupTime: number;
};

function lineupScale(book: HTMLElement, count: number): number {
  const fit = (window.innerWidth * 0.84) / (count * FINALE.gap * Math.max(book.offsetWidth, 1));
  return Math.min(FINALE.maxScale, fit);
}

export function createFinaleTimeline({ books, text, flash, stage, spotlight }: FinaleInput): FinaleTimeline {
  const timeline = gsap.timeline({ defaults: { ease: "none" } });
  const count = books.length;
  const lineupTime = (count - 1) * FINALE.stagger + FINALE.walkIn;

  books.forEach((book, index) => {
    const scale = () => lineupScale(book, count);

    timeline.to(
      book,
      {
        xPercent: () => (index - (count - 1) / 2) * 100 * FINALE.gap * scale(),
        rotationY: 0,
        z: 0,
        scale,
        opacity: 1,
        duration: FINALE.walkIn,
        ease: "power2.out",
      },
      index * FINALE.stagger
    );
  });

  timeline.fromTo(
    stage,
    { "--spotlight": spotlight.from },
    { "--spotlight": spotlight.to, duration: FINALE.walkIn, immediateRender: false },
    0
  );

  timeline.fromTo(
    text,
    { autoAlpha: 0, y: 24 },
    { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
    Math.max(lineupTime - FINALE.textLead, 0)
  );

  const photoAt = lineupTime + FINALE.photoDelay;
  timeline.fromTo(flash, { opacity: 0 }, { opacity: 0.85, duration: FINALE.flash * 0.3, immediateRender: false }, photoAt);
  timeline.to(flash, { opacity: 0, duration: FINALE.flash * 0.7, ease: "power1.in" }, photoAt + FINALE.flash * 0.3);

  timeline.to({}, { duration: FINALE.hold }, photoAt + FINALE.flash);

  return { timeline, lineupTime };
}