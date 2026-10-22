// src/features/runway/hooks/useRunwayAnimation.ts

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCROLL_VH_PER_UNIT } from "../animation/runwayTiming";
import type { Look } from "../domain/runwaySchema";
import { createRunwayTimeline } from "../animation/createRunwayTimeline";

gsap.registerPlugin(ScrollTrigger);

export function useRunwayAnimation(stageRef: RefObject<HTMLElement | null>, looks: readonly Look[]): void {
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const context = gsap.context(() => {
      const timeline = createRunwayTimeline(stage, looks);

      ScrollTrigger.create({
        animation: timeline,
        trigger: stage,
        start: "top top",
        end: () => `+=${(timeline.duration() * SCROLL_VH_PER_UNIT * window.innerHeight) / 100}`,
        pin: true,
        scrub: 0.6,
        snap: {
          snapTo: "labels",
          duration: { min: 0.2, max: 0.7 },
          delay: 0.12,
          ease: "power2.inOut",
        },
      });
    }, stage);

    return () => context.revert();
  }, [stageRef, looks]);
}