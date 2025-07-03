import Image from "next/image";
import React from "react";

export const VillaExample: React.FC = () => {
  return (
    <div className="w-full mt-14 relative">

      <div className="relative w-full h-[500px]">
        <Image
          src="/images/collections/cover2.webp"
          alt="Villa Example"
          width={1300}
          height={600}
          quality={100}
          className="object-cover w-full h-full"
        />
        {/* Gray overlay */}
        <div className="absolute inset-0 bg-neutral-700/40"></div>
      </div>

      <p className="text-white text-center text-3xl font-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-cormorant-garamond)]">
        Villa Borghese, Rome
      </p>
    </div>
  );
};