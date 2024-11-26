"use client";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/MapContainer"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <LazyMap />
    </main>
  );
}


