"use client";

import MapSection from "@/components/interactive-map/MapSection";
import FilterButton from "@/components/ui/buttons/FilterButton";

export default function NukePage() {
  return (
    <main>
      <section className="flex flex-col items-center pb-32 pt-12">
        <MapSection image={"/assets/maps/nuke/radar-up.webp"} />
      </section>
    </main>
  );
}
