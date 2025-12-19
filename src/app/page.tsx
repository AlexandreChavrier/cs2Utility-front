import HeroContent from "@/components/home/Welcome";
import HeroMapsGrid from "@/components/home/MapsGrid";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center pb-32 pt-12">
        <HeroContent />
        <HeroMapsGrid />
      </section>
    </main>
  );
}
