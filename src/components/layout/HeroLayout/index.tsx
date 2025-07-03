// components/layout/HeroLayout.tsx
import { Header } from "@/components/layout/Header";
import { ReactNode } from "react";

interface HeroLayoutProps {
  children: ReactNode;
  backgroundImage?: string;
  overlay?: boolean;
  className?: string;
}

export const HeroLayout = ({ 
  children, 
  backgroundImage = "/images/hero/hero.webp",
  overlay = true,
  className = ""
}: HeroLayoutProps) => {
  return (
    <div className={`relative min-h-[680px] ${className}`}>
      {/* Shared Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        {/* Optional Overlay */}
        {overlay && <div className="absolute inset-0 bg-black/30"></div>}
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Header />
        {children}
      </div>
    </div>
  );
};