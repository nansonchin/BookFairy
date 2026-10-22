// src/features/runway/animation/createAmbientMotion.ts
// 责任：不跟滚动绑定、自己会动的东西（标题入场、书墙缓慢漂移）。
// 和 scrub 的 timeline 分开，这样滚动进度不会影响它们。

import { gsap } from "gsap";
import { requireAll, requireElement } from "./dom";

export function createAmbientMotion(stage: HTMLElement): void {
  gsap.from(requireAll(stage, '[data-part="intro-line"]'), {
    yPercent: 110,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.12,
  });

  gsap.to(requireElement(stage, '[data-part="wall"]'), {
    x: -40,
    y: -30,
    duration: 14,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}
