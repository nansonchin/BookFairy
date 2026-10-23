// src/features/runway/components/RunwayStage/RunwayStage.tsx

import { useRef } from "react";
import { useRunwayAnimation } from "../../hooks/useRunwayAnimation";
import { BookWall } from "../BookWall/BookWall";
import { FinaleCall } from "../FinaleCall/FinaleCall";
import { LookScene } from "../LookScene/LookScene";
import "./RunwayStage.scss";
import type { Look } from "../../domain/runwaySchema";
import type { SelectDrop } from "../../domain/selection";

type RunwayStageProps = {
  readonly looks: readonly Look[];
};

export function RunwayStage({ looks }: RunwayStageProps) {
  const stageRef = useRef<HTMLElement>(null);

  useRunwayAnimation(stageRef, looks);

  return (
    <section ref={stageRef} className="stage" aria-label="Latest book drops">
      <div className="stage__glow" aria-hidden="true" />
      <BookWall looks={looks} />
      <div className="stage__vignette" aria-hidden="true" />
      <div className="stage__grain" aria-hidden="true" />

      {looks.map((look) => (
        <LookScene key={look.id} look={look} />
      ))}

      <div className="stage__finale" data-part="finale-text">
        <FinaleCall looks={looks}/>
      </div>

      <div className="stage__title" data-part="intro-title" aria-hidden="true">
        <p className="stage__kicker">Free books, left in the wild</p>
        <div className="stage__headline">
          <span className="stage__line">
            <i data-part="intro-line">Books</i>
          </span>
          <span className="stage__line">
            <i data-part="intro-line">
              that <em>leave</em>
            </i>
          </span>
          <span className="stage__line">
            <i data-part="intro-line">the shelf</i>
          </span>
        </div>
        <p className="stage__hint">Scroll — the latest drops</p>
      </div>
    </section>
  );
}
