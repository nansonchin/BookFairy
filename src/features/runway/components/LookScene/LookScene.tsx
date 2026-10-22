// src/features/runway/components/LookScene/LookScene.tsx

import { cssVars } from "../../../../shared/lib/cssVar";
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
      <div className="scene__book" data-part="book">
        <BookCover look={look}>
          <LookRibbon />
        </BookCover>
      </div>

      <div className="scene__caption" data-part="caption">
        <LookCaption look={look} />
      </div>

      <div className="scene__polaroid" data-part="polaroid">
        <figure className="polaroid" style={cssVars({ "--photo": look.cover.background })}>
          <div className="polaroid__photo" aria-hidden="true" />
          <figcaption>
            <p className="polaroid__city">{look.drop.city}</p>
            <p className="polaroid__place">{look.drop.place}</p>
            <p className="polaroid__date">{formatDropDate(look.drop.date)}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}