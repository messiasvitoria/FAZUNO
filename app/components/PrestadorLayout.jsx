"use client";

import SidebarPrestador from "./Sidebarprestador";
import TopBarPrestador from "./TopBarPrestador";

const SIDEBAR_WIDTH = 216;

export default function PrestadorLayout({ children, title, subtitle, contentStyle }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FB" }}>
      <SidebarPrestador />
      <div style={{ marginLeft: SIDEBAR_WIDTH, minWidth: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "fixed", top: 0, left: SIDEBAR_WIDTH, right: 0, zIndex: 80 }}>
          <TopBarPrestador title={title} subtitle={subtitle} />
        </div>
        <main style={{ flex: 1, minWidth: 0, paddingTop: 56, ...contentStyle }}>
          {children}
        </main>
      </div>
    </div>
  );
}
