// src/App.tsx
// 责任：路由。首页 = 介绍；/latest = 最新放出的书（走秀）。

import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LatestPage } from "./pages/LatestPage";
import { ScrollToTop } from "./shared/components/ScrollToTop";
import { SiteFooter } from "./shared/components/SiteFooter/SiteFooter";
import { SiteHeader } from "./shared/components/SiteHeader/SiteHeader";
import "./App.scss";

function Layout() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="latest" element={<LatestPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
