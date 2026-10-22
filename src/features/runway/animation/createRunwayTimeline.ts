// src/features/runway/animation/createRunwayTimeline.ts

import { gsap } from "gsap";
import { createIntroTimeline } from "./createIntroTimeline";
import { createLookTimeline } from "./createLookTimeline";
import { readCssVar, requireAll, requireElement } from "./dom";
import { FINALE, INTRO, LOOK } from "./runwayTiming";
import type { Look } from "../domain/runwaySchema";
import { createFinaleTimeline } from "./createFinaleTimeline";

export function createRunwayTimeline(stage: HTMLElement, looks: readonly Look[]): gsap.core.Timeline {
  const flash = requireElement(stage, '[data-part="flash"]');
  const timeline = gsap.timeline();

  timeline.addLabel("intro", 0);
  const intro = createIntroTimeline({
    left: requireElement(stage, '[data-part="curtain-left"]'),
    right: requireElement(stage, '[data-part="curtain-right"]'),
    title: requireElement(stage, '[data-part="intro-title"]'),
  });
  timeline.add(intro, 0);

  const brandColor = readCssVar(stage, "--color-teal");
  let cursor = intro.duration() - INTRO.overlap; 
  let previousSpotlight = brandColor;
  const books: HTMLElement[] = [];

  for (const look of looks) {
    const scene = requireElement(stage, `[data-scene="${CSS.escape(look.id)}"]`);
    const book = requireElement(scene, '[data-part="book"]');
    books.push(book);

    const built = createLookTimeline({
      elements: {
        book,
        caption: requireElement(scene, '[data-part="caption"]'),
        polaroid: requireElement(scene, '[data-part="polaroid"]'),
        ribbonPaths: requireAll<SVGPathElement>(scene, '[data-part="ribbon-path"]'),
      },
      flash,
      stage,
      spotlight: { from: previousSpotlight, to: look.spotlight },
    });

    timeline.add(built.timeline, cursor);
    timeline.addLabel(`pose-${look.number}`, cursor + built.poseTime);
    timeline.addLabel(`landed-${look.number}`, cursor + built.landedTime);

    // 下一本提前一点开始，所以这里减掉重叠的时间
    cursor += built.timeline.duration() - LOOK.overlap;
    previousSpotlight = look.spotlight;
  }

  const finaleStart = Math.max(timeline.duration() - (looks.length - 1) * FINALE.stagger, 0);
  const finale = createFinaleTimeline({
    books,
    text: requireElement(stage, '[data-part="finale-text"]'),
    flash,
    stage,
    spotlight: { from: previousSpotlight, to: brandColor },
  });
  timeline.add(finale.timeline, finaleStart);

  timeline.addLabel("outro", timeline.duration());

  return timeline;
}