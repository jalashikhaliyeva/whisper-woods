
"use client";
import { Header } from "@/components/layout/Header";
import { useHeroImage } from "@/lib/hooks/useFirebase";
import { HeroLayoutProps } from "@/types";

export const HeroLayout = ({
  children,
  overlay = true,
  className = "",
  useFirebaseImage = true,
}: HeroLayoutProps) => {
  const { heroImageUrl, loading, error } = useHeroImage();

  const imageUrl = useFirebaseImage && !error ? heroImageUrl : "";

  return (
    <div className={`relative min-h-[680px] ${className}`}>
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        {overlay && <div className="absolute inset-0 bg-black/30"></div>}
      </div>

      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        </div>
      )}

      <div className="relative z-10">
        <Header />
        {children}
      </div>
    </div>
  );
};
