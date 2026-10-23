// src/features/runway/domain/format.ts
// 责任：把 Look 里的原始数据变成「给人看的文字」。

import type { Look } from "./runwaySchema";

// 3 → "03"
export function formatLookNumber(number: number): string {
  return String(number).padStart(2, "0");
}

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" });

export function formatDropDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

export function formatDropWhere(look:Pick<Look,"status"|"drop">):string{
    const {drop,status}= look
    return status === "waiting"?`${drop.city}, ${drop.country}` : `${drop.place},${drop.city}`
}