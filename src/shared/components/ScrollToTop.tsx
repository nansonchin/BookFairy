// src/shared/components/ScrollToTop.tsx
// 责任：换页时回到顶部。否则从很长的 /latest 回到首页会停在半路。

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
