"use client";

import MapSection from "@/components/interactive-map/MapSection";

export default function AncientPage() {
  return (
    <main>
      <section className="flex flex-col items-center pb-32 pt-12">
        <MapSection image={"/assets/maps/ancient/radar.webp"} />
      </section>
    </main>
  );
}
