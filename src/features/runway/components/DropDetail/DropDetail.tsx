// src/features/runway/components/DropDetail/DropDetail.tsx
// 责任：点开一本书后的详情。封面用 GSAP Flip 从书排里「飞」进来，关闭时飞回去。
// Esc / 点背景 / 关闭按钮都能关；关闭后焦点回到被点的书。

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { usePrefersReducedMotion } from "../../../../shared/hooks/usePrefersReducedMotion";
import { STICKERS_URL } from "../../../../shared/lib/links";
import { formatDropDate, formatDropWhere } from "../../domain/format";
// import type { DropSelection } from "../../domain/selection";
import { BookCover } from "../BookCover/BookCover";
import { StatusPill } from "../StatusPill/StatusPill";
import "./DropDetail.scss";
import type { Look } from "../../domain/runwaySchema";
import { DropPhoto } from "../DropPhoto/DropPhoto";

gsap.registerPlugin(Flip);

type DropDetailProps = {
  readonly look: Look | null;
  readonly onClose: () => void; // 必须是稳定引用（useCallback）
};

export function findOrigin(dropId: string): HTMLElement | null {
  const cover = document.querySelector<HTMLElement>(
    `[data-drop-id="${CSS.escape(dropId)} .book-cover"]`,
  );
  if (!cover) {
    return null;
  }

  if (getComputedStyle(cover).visibility === "hidden") {
    return null;
  }

  const rect = cover.getBoundingClientRect();
  const onScreen =
    rect.bottom > 0 &&
    rect.top < innerHeight &&
    rect.right > 0 &&
    rect.left < innerWidth;
  return onScreen ? cover : null;
}

export function DropDetail({ look, onClose }: DropDetailProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const originRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  // const look = selection?.look ?? null;
  // const origin = selection?.origin ?? null;

  // 打开：把详情封面瞬间「贴」到书排里那本书的位置和大小，再动画回到自己的位置
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!look || !root) return;

    closingRef.current = false;
    const origin = findOrigin(look.id);
    originRef.current = origin;
    const cover = root.querySelector<HTMLElement>(".drop-detail__cover");

    const context = gsap.context(() => {
      gsap.fromTo(
        ".drop-detail__backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
      );

      if (reducedMotion || !cover || !origin) return;

      origin.style.visibility = "hidden"; // 原来的那本书「被拿起来」了
      Flip.fit(cover, origin, { scale: true, duration: 0 });
      gsap.to(cover, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.8,
        ease: "power3.inOut",
      });
      gsap.from(".drop-detail__body > *", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.35,
      });
    }, root);

    return () => {
      context.revert();
      if (origin) origin.style.visibility = "";
    };
  }, [look, origin, reducedMotion]);

  // 打开期间锁住背后的滚动（走秀是滚动驱动的，背后滚动会让 finale 状态乱掉）
  useEffect(() => {
    if (!look) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [look]);

  // 焦点：打开时进关闭按钮，关闭后回到原来的元素
  useEffect(() => {
    if (!look) return;
    const previous = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previous?.focus();
  }, [look]);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const origin = originRef.current;
    const root = rootRef.current;
    const cover = root?.querySelector<HTMLElement>(".drop-detail__cover");

    if (reducedMotion || !root || !cover || !origin?.isConnected) {
      onClose();
      return;
    }

    gsap.to(".drop-detail__backdrop", { opacity: 0, duration: 0.45 });
    gsap.to(".drop-detail__body, .drop-detail__close", {
      opacity: 0,
      duration: 0.2,
    });
    Flip.fit(cover, origin, {
      scale: true,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        origin.style.visibility = "";
        onClose();
      },
    });
  }, [onClose, reducedMotion]);

  useEffect(() => {
    if (!look) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [look, requestClose]);

  if (!look) return null;

  const waiting = look.status === "waiting";

  return (
    <div
      ref={rootRef}
      className="drop-detail"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drop-detail-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div className="drop-detail__backdrop" aria-hidden="true" />

      <button
        ref={closeButtonRef}
        type="button"
        className="drop-detail__close"
        onClick={requestClose}
      >
        Close ✕
      </button>

      <div className="drop-detail__card">
        <BookCover look={look} className="drop-detail__cover" />

        <div className="drop-detail__body">
          <h2 id="drop-detail-title" className="drop-detail__city">
            {look.drop.city}
          </h2>
          <p className="drop-detail__concept">{look.concept}</p>

          <dl className="drop-detail__facts">
            <dt>Status</dt>
            <dd>
              <StatusPill status={look.status} />
            </dd>
            <dt>Where</dt>
            <dd>
              {formatDropWhere(look)}
              {waiting && <small>Exact spot revealed once found</small>}
            </dd>
            <dt>Dropped</dt>
            <dd>{formatDropDate(look.drop.date)}</dd>
            <dt>Note</dt>
            <dd>{look.backstage}</dd>
          </dl>

          <a
            className="drop-detail__cta"
            href={STICKERS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Leave a book like this
          </a>
        </div>
        <DropPhoto look={look}/>
      </div>
    </div>
  );
}
