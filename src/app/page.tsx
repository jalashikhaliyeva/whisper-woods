// app/page.tsx
import { Hero } from "@/components/sections/HomePage/Hero";
import { Collection } from "@/components/sections/HomePage/Collections";
import { HeroLayout } from "@/components/layout/HeroLayout";
import { Banner } from "@/components/sections/HomePage/Banner/Banner";
import { VillaExample } from "@/components/sections/HomePage/VillaExample";
import { VillasSlider } from "@/components/sections/HomePage/VillasSlider/VillasSlider";

export default function Home() {
  return (
    <>
      <HeroLayout>
        <Hero />
      </HeroLayout>
      <Collection />
      <VillaExample />
      <VillasSlider />
      {/* <Banner /> */}
    </>
  );
}
