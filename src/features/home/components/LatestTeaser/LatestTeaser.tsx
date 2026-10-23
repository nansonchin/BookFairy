// src/features/home/components/LatestTeaser/LatestTeaser.tsx
// 责任：首页上的「最新放出」预告：最近 3 本书，点击去 /latest。

import { Link } from "react-router-dom";
import type { Look } from "../../../runway/domain/runwaySchema";
import { BookCover } from "../../../runway/components/BookCover/BookCover";
import { StatusPill } from "../../../runway/components/StatusPill/StatusPill";
import "./LatestTeaser.scss";
import { sortNewestFirst } from "../../../runway/domain/drop";

const TEASER_COUNT = 3;

type LatestTeaserProps = {
  readonly looks: readonly Look[] | null;
};

export function LatestTeaser({ looks }: LatestTeaserProps) {
  if (!looks) return null;

  const latest = sortNewestFirst(looks).slice(0,TEASER_COUNT)

  return (
    <section className="teaser container" aria-labelledby="teaser-title">
      <div className="teaser__head">
        <h2 id="teaser-title" className="teaser__title">
          Latest drops
        </h2>
        <Link className="teaser__all" to="/latest">
          See all →
        </Link>
      </div>

      <ul className="teaser__row">
        {latest.map((look) => (
          <li key={look.id} className="teaser__slot">
            <Link
              to="/latest"
              className="teaser__book"
              aria-label={`${look.book.title}, dropped in ${look.drop.city}`}
            >
              <BookCover look={look} size="M"/>
              <span className="teaser__city">{look.drop.city}</span>
              <StatusPill status={look.status} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
