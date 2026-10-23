// src/shared/components/SiteHeader/SiteHeader.tsx
// 责任：固定在顶部的极简页眉 + 主导航。品牌绿的呼吸点 = 「现在还有书在路上」。

import { NavLink } from "react-router-dom";
import "./SiteHeader.scss";

export function SiteHeader() {
  return (
    <header className="site-header">
      <NavLink to="/" end className="site-header__brand">
        The Book Fairies
      </NavLink>

      <nav className="site-header__nav" aria-label="Main">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/drops">All drops</NavLink>
        <NavLink to="/latest" className="site-header__live">
          <span className="site-header__dot" aria-hidden="true" />
          Latest drops
        </NavLink>
      </nav>
    </header>
  );
}
