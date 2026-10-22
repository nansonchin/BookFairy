// src/features/runway/components/RunwayList/RunwayList.tsx

import { cssVars } from "../../../../shared/lib/cssVar";
import { formatDropDate } from "../../domain/format";
import type { Look } from "../../domain/runwaySchema";
import type { SelectDrop } from "../../domain/selection";
import { BookCover } from "../BookCover/BookCover";
import { FinaleCall } from "../FinaleCall/FinaleCall";
import { LookCaption } from "../LookCaption/LookCaption";
import "./RunwayList.scss";

type RunwayListProps = {
  readonly looks: readonly Look[];
  readonly onSelect: SelectDrop;
};

export function RunwayList({ looks, onSelect }: RunwayListProps) {
  return (
    <section className="runway-list" aria-label="The runway show">
      <ol className="runway-list__items">
        {looks.map((look) => (
          <li key={look.id} className="runway-list__item" style={cssVars({ "--spotlight": look.spotlight })}>
            <BookCover look={look} className="runway-list__cover" />
            <div className="runway-list__body">
              <LookCaption look={look} />
              <p className="runway-list__drop">
                {look.drop.place}, {look.drop.city} · {formatDropDate(look.drop.date)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="runway-list__finale">
        <FinaleCall looks={looks} onSelect={onSelect} />
      </div>
    </section>
  );
}