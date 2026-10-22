// src/features/runway/components/FinaleCall/FinaleCall.tsx
// 责任：收尾画面——一排可以点开的书 + 加入妖精的 CTA。

import type { Look } from "../../domain/runwaySchema";
import type { SelectDrop } from "../../domain/selection";
import { STICKERS_URL } from "../../../../shared/lib/links";
import { BookCover } from "../BookCover/BookCover";
import "./FinaleCall.scss";

type FinaleCallProps = {
  readonly looks: readonly Look[];
  readonly onSelect: SelectDrop;
};

export function FinaleCall({ looks, onSelect }: FinaleCallProps) {
  return (
    <div className="finale-call">
      <p className="finale-call__message">Somewhere right now, a book is waiting on a bench.</p>

      <ul className="finale-call__row">
        {looks.map((look) => (
          <li key={look.id} className="finale-call__slot" data-part="finale-item">
            <button
              type="button"
              className="finale-call__book"
              onClick={(event) => onSelect(look, event.currentTarget.querySelector<HTMLElement>(".book-cover"))}
              aria-label={`${look.book.title}, dropped in ${look.drop.city}. View details`}
            >
              <BookCover look={look} />
              <span className="finale-call__city">{look.drop.city}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="finale-call__tip">Tap a book to see where it landed</p>

      <a className="finale-call__cta" href={STICKERS_URL} target="_blank" rel="noopener noreferrer">
        Become a book fairy
      </a>
    </div>
  );
}
