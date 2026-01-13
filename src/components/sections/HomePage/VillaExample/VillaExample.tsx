"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";

export const VillaExample: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="w-full mt-14 relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-[500px] overflow-hidden">
        {/* Static Image */}
        <Image
          src="/images/collections/cover2.webp"
          alt="Villa Example"
          width={1300}
          height={600}
          quality={100}
          className={`object-cover w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Video - preloaded and ready */}
        <video
          ref={videoRef}
          src="/images/video1.mp4"
          muted
          loop
          playsInline
          preload="auto"
          className={`object-cover w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Gray overlay with smooth transition */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            isHovered ? "bg-neutral-900/20" : "bg-neutral-700/40"
          }`}
        />
      </div>

      <p className="text-white text-center text-3xl font-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-cormorant-garamond)]">
        Villa Borghese, Rome
      </p>
    </div>
  );
};
