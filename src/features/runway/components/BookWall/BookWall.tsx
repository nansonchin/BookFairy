// src/features/runway/components/BookWall/BookWall.tsx
// 责任：舞台背后那面淡淡的书墙。每个格子带 data-wall-look，动画靠它找到「当前这本书」。

import { useMemo } from "react";
import type { Look } from "../../domain/runwaySchema";
import { BookCover } from "../BookCover/BookCover";
import "./BookWall.scss";

const TILE_COUNT = 60;

type BookWallProps = {
  readonly looks: readonly Look[];
};

export function BookWall({ looks }: BookWallProps) {
  // 打散顺序，避免同一本书在相邻格子连续出现
  const tiles = useMemo(
    () =>{
      if(looks.length === 0){
        return []
      }
      
      return Array.from(
        { length: TILE_COUNT },
        (_, i) => 
        looks[(i * 5 + Math.floor(i / 6)) % looks.length])
        .filter((look):look is Look => look !==undefined)
    },
    [looks],
  );

  if(tiles.length ===0){
    return null
  }
  return (
    <div className="book-wall" data-part="wall" aria-hidden="true">
      {tiles.map((look, index) => {
        return (
          <div key={index} className="book-wall__tile" data-wall-look={look.id}>
            <BookCover look={look}  size="M"/>
          </div>
        );
      })}
    </div>
  );
}
