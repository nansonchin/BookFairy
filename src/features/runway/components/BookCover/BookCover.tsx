// src/features/runway/components/BookCover/BookCover.tsx
// 责任：把「书名、作者、封面设定」画成一本书的封面。
// 它不知道自己在哪里出现（舞台、列表都可以），尺寸由外面决定。

import { MOTIF_ART } from "./motifs";
import "./BookCover.scss";
import type { Look } from "../../domain/runwaySchema";
import { cssVars } from "../../../../shared/lib/cssVar";
import { cx } from "../../../../shared/lib/cx";

type BookCoverProps = {
  readonly look: Pick<Look, "book" | "cover">;
  readonly className?: string;
};

export function BookCover({ look, className }: BookCoverProps) {
  const { book, cover } = look;
  const Art = MOTIF_ART[cover.motif];

  return (
    <div
      className={cx("book-cover", className)}
      style={cssVars({ "--cover-bg": cover.background, "--cover-ink": cover.ink })}
    >
      <svg className="book-cover__art" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <Art />
      </svg>

      <div className="book-cover__text">
        <p className="book-cover__title">{book.title}</p>
        <p className="book-cover__author">{book.author}</p>
      </div>
    </div>
  );
}