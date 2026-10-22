// src/features/runway/domain/selection.ts
// 责任：「用户点了哪本书、从哪个元素点的」。origin 是 Flip 动画的起点。

import type { Look } from "./runwaySchema";

export type DropSelection = {
  readonly look: Look;
  readonly origin: HTMLElement | null;
};

export type SelectDrop = (look: Look, origin: HTMLElement | null) => void;
