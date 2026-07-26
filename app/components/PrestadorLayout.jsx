"use client";

import SidebarPrestador from "./SidebarPrestador";
import TopBarPrestador from "./TopBarPrestador";

const SIDEBAR_WIDTH = 216;

export default function PrestadorLayout({ children, title, subtitle, contentStyle }) {
  return (
    <div style={{ minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden", background: "#F5F7FB" }}>
      <SidebarPrestador />
      <div style={{ marginLeft: SIDEBAR_WIDTH, width: `calc(100% - ${SIDEBAR_WIDTH}px)`, minWidth: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "fixed", top: 0, left: SIDEBAR_WIDTH, right: 0, zIndex: 80 }}>
          <TopBarPrestador title={title} subtitle={subtitle} />
        </div>
        <main style={{ flex: 1, minWidth: 0, maxWidth: "100%", overflowX: "hidden", paddingTop: 56, ...contentStyle }}>
          {children}
        </main>
      </div>
    </div>
  );
}
