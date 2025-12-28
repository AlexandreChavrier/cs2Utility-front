"use client";

import { useParams } from "next/navigation";
import { DetailsSection } from "@/components/map-details/DetailsSection";

export default function LineupDetailsPage() {
  const params = useParams();
  const lineupUuid = params.lineupUuid as string;

  if (lineupUuid) {
    return (
      <main>
        <section className="flex flex-col items-center pb-32 pt-12">
          <DetailsSection />
        </section>
      </main>
    );
  }
}
