// src/features/home/hooks/useReveal.ts
// 责任：首页的入场动画。标题逐行升起；带 data-reveal 的元素滚到视口时淡入上浮。

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../../shared/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function useReveal(scopeRef: RefObject<HTMLElement | null>): void {
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from("[data-hero-line]", { yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.12 });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 85%" },
        });
      });
    }, scope);

    return () => context.revert();
  }, [scopeRef, reducedMotion]);
}
