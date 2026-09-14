"use client";

import dynamic from "next/dynamic";

// Konva depends on browser canvas APIs, so load the editor only in the browser.
const CanvasApp = dynamic(() => import("../src/App.jsx"), { ssr: false });

export default function HomePage() {
  return <CanvasApp />;
}
