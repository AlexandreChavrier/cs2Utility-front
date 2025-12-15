"use client";

import MapSection from "@/components/interactive-map/MapSection";

export default function Dust2Page() {
  return (
    <main>
      <section className="flex flex-col items-center pb-32 pt-12">
        <MapSection image={"/assets/maps/dust2/radar.webp"} />
      </section>
    </main>
  );
}
