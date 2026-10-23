// src/pages/HomePage.tsx
// 责任：首页——什么是 Book Fairies。只负责把各个板块按顺序摆好。

import { useRef } from "react";
import { HomeHero } from "../features/home/components/HomeHero/HomeHero";
import { HowItWorks } from "../features/home/components/HowItWorks/HowItWorks";
import { JoinCta } from "../features/home/components/JoinCta/JoinCta";
import { LatestTeaser } from "../features/home/components/LatestTeaser/LatestTeaser";
import { Stats } from "../features/home/components/Stats/Stats";
import { useReveal } from "../features/home/hooks/useReveal";
import { useLooks } from "../features/runway/hooks/useLooks";
import { useLooksState } from "../features/runway/context/LooksContext";

export function HomePage() {
  const state = useLooksState();
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  const looks = state.status === "ready" ? state.looks : null;

  return (
    <main ref={mainRef}>
      <HomeHero looks={looks} />
      <HowItWorks />
      <Stats />
      <LatestTeaser looks={looks} />
      <JoinCta />
    </main>
  );
}
