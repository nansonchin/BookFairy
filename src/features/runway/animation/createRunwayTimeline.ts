// src/features/runway/animation/createRunwayTimeline.ts

import { gsap } from "gsap";
import { createFinaleTimeline } from "./createFinaleTimeline";
import { createIntroTimeline } from "./createIntroTimeline";
import { createLookTimeline } from "./createLookTimeline";
import { readCssVar, requireAll, requireElement } from "./dom";
import { INTRO, LOOK } from "./runwayTiming";
import type { Look } from "../domain/runwaySchema";

export function createRunwayTimeline(stage: HTMLElement, looks: readonly Look[]): gsap.core.Timeline {
  const timeline = gsap.timeline();

  timeline.addLabel("intro", 0);
  const intro = createIntroTimeline({ title: requireElement(stage, '[data-part="intro-title"]') });
  timeline.add(intro, 0);

  const brandColor = readCssVar(stage, "--color-brand");
  let cursor = intro.duration() - INTRO.overlap;
  let previousSpotlight = brandColor;

  for (const look of looks) {
    const scene = requireElement(stage, `[data-scene="${CSS.escape(look.id)}"]`);

    const built = createLookTimeline({
      elements: {
        book: requireElement(scene, '[data-part="book"]'),
        city: requireElement(scene, '[data-part="city"]'),
        caption: requireElement(scene, '[data-part="caption"]'),
        ribbonPaths: requireAll<SVGPathElement>(scene, '[data-part="ribbon-path"]'),
        tiles: requireAll(stage, `[data-wall-look="${CSS.escape(look.id)}"]`),
      },
      stage,
      spotlight: { from: previousSpotlight, to: look.spotlight },
    });

    timeline.add(built.timeline, cursor);
    timeline.addLabel(`pose-${look.number}`, cursor + built.poseTime);

    // 下一本提前一点开始，所以这里减掉重叠的时间
    cursor += built.timeline.duration() - LOOK.overlap;
    previousSpotlight = look.spotlight;
  }

  const finaleStart = Math.max(timeline.duration() - LOOK.overlap, 0);
  const finale = createFinaleTimeline({
    text: requireElement(stage, '[data-part="finale-text"]'),
    items: requireAll(stage, '[data-part="finale-item"]'),
    wall: requireAll(stage, "[data-wall-look]"),
    stage,
    spotlight: { from: previousSpotlight, to: brandColor },
  });
  timeline.add(finale.timeline, finaleStart);
  timeline.addLabel("finale", finaleStart + finale.lineupTime);
  timeline.addLabel("outro", timeline.duration());

  return timeline;
}
