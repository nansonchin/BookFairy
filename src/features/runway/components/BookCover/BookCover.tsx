// src/features/runway/components/BookCover/BookCover.tsx

import type { ReactNode } from "react";
import { MOTIF_ART } from "./motifs";
import "./BookCover.scss";
import type { Look } from "../../domain/runwaySchema";
import { cssVars } from "../../../../shared/lib/cssVar";
import { cx } from "../../../../shared/lib/cx";
import { coverUrlFor, type CoverSize } from "../../domain/cover";
import { useCoverImage } from "../../hooks/useCoverImage";

type BookCoverProps = {
  readonly look: Pick<Look, "book" | "cover">;
  readonly size?: CoverSize;
  readonly className?: string;
  readonly children?: ReactNode;
};

export function BookCover({
  look,
  size = "L",
  className,
  children,
}: BookCoverProps) {
  const { book, cover } = look;
  const Art = MOTIF_ART[cover.motif];

  const url = coverUrlFor(book, size);
  const status = useCoverImage(url);
  const hasPhoto = status === "ready" && url !== null;

  return (
    <div
      className={cx("book-cover", hasPhoto && "book-cover--photo", className)}
      style={cssVars({
        "--cover-bg": cover.background,
        "--cover-ink": cover.ink,
      })}
    >
      <svg
        className="book-cover__art"
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
      >
        <Art />
      </svg>

      <div className="book-cover__text">
        <p className="book-cover__title">{book.title}</p>
        <p className="book-cover__author">{book.author}</p>
      </div>

      {hasPhoto && (
        <img className="book-cover__photo" src={url} alt="" decoding="async" />
      )}

      {children}
    </div>
  );
}
