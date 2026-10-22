// src/features/runway/components/LookScene/LookScene.tsx

import { formatDropDate } from "../../domain/format";
import type { Look } from "../../domain/runwaySchema";
import { BookCover } from "../BookCover/BookCover";
import { LookCaption } from "../LookCaption/LookCaption";
import { LookRibbon } from "../LookRibbon/LookRibbon";
import "./LookScene.scss";

type LookSceneProps = {
  readonly look: Look;
};

export function LookScene({ look }: LookSceneProps) {
  return (
    <div className="scene" data-scene={look.id}>
      <p className="scene__city" data-part="city" aria-hidden="true">
        {look.drop.city}
      </p>

      <div className="scene__book" data-part="book">
        <BookCover look={look}>
          <LookRibbon />
        </BookCover>
      </div>

      <div className="scene__caption" data-part="caption">
        <LookCaption look={look} />
        <p className="scene__where">
          {look.drop.city}, {look.drop.country} · {formatDropDate(look.drop.date)}
        </p>
      </div>
    </div>
  );
}
