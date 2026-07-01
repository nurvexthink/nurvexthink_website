"use client";

import dynamic from "next/dynamic";

// Lazy-load the 3D so it never blocks first paint. ssr:false keeps Three.js off the server.
const Hero3D = dynamic(() => import("./hero-3d"), { ssr: false, loading: () => null });

export function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Hero3D />
    </div>
  );
}
