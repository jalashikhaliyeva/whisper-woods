// components/layout/HeroLayout.tsx
'use client'
import { Header } from "@/components/layout/Header";
import { ReactNode } from "react";
import { useHeroImage } from "@/hooks/useFirebase";

interface HeroLayoutProps {
  children: ReactNode;
  backgroundImage?: string;
  overlay?: boolean;
  className?: string;
  useFirebaseImage?: boolean;
}

export const HeroLayout = ({ 
  children, 
  overlay = true,
  className = "",
  useFirebaseImage = true
}: HeroLayoutProps) => {
  const { heroImageUrl, loading, error } = useHeroImage();
  
  // Use Firebase image if enabled and available, otherwise fallback to prop
    const imageUrl = useFirebaseImage && !error ? heroImageUrl : "";

  return (
    <div className={`relative min-h-[680px] ${className}`}>
      {/* Shared Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        {/* Optional Overlay */}
        {overlay && <div className="absolute inset-0 bg-black/30"></div>}
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        </div>
      )}
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Header />
        {children}
      </div>
    </div>
  );
};