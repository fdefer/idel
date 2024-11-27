"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/MapContainer"), { ssr: false });

export default function Home() {
  return (
    <main>
      <Map />
    </main>
  );
}


