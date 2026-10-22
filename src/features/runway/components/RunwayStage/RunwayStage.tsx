// src/features/runway/components/RunwayStage/RunwayStage.tsx

import { useRef } from "react";
import { useRunwayAnimation } from "../../hooks/useRunwayAnimation";
import { FinaleCall } from "../FinaleCall/FinaleCall";
import { LookScene } from "../LookScene/LookScene";
import "./RunwayStage.scss";
import type { Look } from "../../domain/runwaySchema";

type RunwayStageProps = {
  readonly looks: readonly Look[];
};

export function RunwayStage({ looks }: RunwayStageProps) {
  const stageRef = useRef<HTMLElement>(null);

  useRunwayAnimation(stageRef, looks);

  return (
    <section ref={stageRef} className="stage" aria-label="The runway show">
      <div className="stage__floor" aria-hidden="true" />
      <div className="stage__runway" aria-hidden="true" />
      <div className="stage__spot" aria-hidden="true" />

      {looks.map((look) => (
        <LookScene key={look.id} look={look} />
      ))}

      <div className="stage__finale" data-part="finale-text">
        <FinaleCall />
      </div>

      <div className="stage__curtain stage__curtain--left" data-part="curtain-left" aria-hidden="true" />
      <div className="stage__curtain stage__curtain--right" data-part="curtain-right" aria-hidden="true" />

      <div className="stage__title" data-part="intro-title" aria-hidden="true">
        <p className="stage__kicker">An unofficial concept for The Book Fairies</p>
        <p className="stage__headline">The Book Fairies Runway</p>
        <p className="stage__hint">Scroll to begin the show</p>
      </div>

      <div className="stage__flash" data-part="flash" aria-hidden="true" />
    </section>
  );
}