import HeroContent from "@/components/home/HeroContent";
import HeroMapsGrid from "@/components/home/HeroMapsGrid";

export default function Home() {

  return (
    <main>
      <section className="flex flex-col items-center pb-30 pt-12">
        <HeroContent />
        <HeroMapsGrid />
      </section>
    </main>
  );
}