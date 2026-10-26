// src/App.tsx
// 责任：路由。首页 = 介绍；/latest = 最新放出的书（走秀）。

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LatestPage } from "./pages/LatestPage";
import { ScrollToTop } from "./shared/components/ScrollToTop";
import { SiteFooter } from "./shared/components/SiteFooter/SiteFooter";
import { SiteHeader } from "./shared/components/SiteHeader/SiteHeader";
import "./App.scss";
import { LooksProvider } from "./features/runway/context/LooksProvider";
import { readBackground } from "./shared/lib/backgroundLocation";
import React from "react";
import { DropPage } from "./pages/DropsPage";
import { DropRoute } from "./features/runway/components/DropRoute/DropRoute";
import { AboutPage } from "./pages/AboutPage";

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

function AppRoutes(){
  const location = useLocation();
  const background=readBackground(location)

  return(
    <React.Fragment>
        <Routes location={background?? location}>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="latest" element={<LatestPage />} />
            <Route path="drops/:id?" element={<DropPage/>}/>
            <Route path="about" element={<AboutPage/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        {background &&(
          <Routes>
            <Route path="drops/:id" element={<DropRoute/>}/>
          </Routes>
        )}
    </React.Fragment>
  )
}

export default function App() {
  return (
    <LooksProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </LooksProvider>
  );
}
