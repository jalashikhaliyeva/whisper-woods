// app/page.tsx
import { Hero } from "@/components/sections/HomePage/Hero";
import { Collection } from "@/components/sections/HomePage/Collections";
import { HeroLayout } from "@/components/layout/HeroLayout";

import { VillaExample } from "@/components/sections/HomePage/VillaExample";
import { VillasSlider } from "@/components/sections/HomePage/VillasSlider/VillasSlider";
import Footer from "@/components/layout/Footer";

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
      <Footer />
    </>
  );
}
