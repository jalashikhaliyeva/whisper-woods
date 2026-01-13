"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";

export const VillasSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const villas = [
    {
      id: 1,
      image: "/images/slide/slide1.webp",
      title: "Modern Beach Villa",
      description:
        "Stunning oceanfront property with panoramic sea views and contemporary design",
    },
    {
      id: 2,
      image: "/images/slide/slide3.webp",
      title: "Mountain Retreat",
      description:
        "Luxury villa nestled in the mountains with breathtaking valley views",
    },
    {
      id: 3,
      image: "/images/slide/slide4.jpg",
      title: "Tropical Paradise",
      description:
        "Private villa surrounded by lush gardens and crystal-clear pools",
    },
    {
      id: 4,
      image: "/images/slide/slide5.jpg",
      title: "Desert Oasis",
      description:
        "Architectural masterpiece blending modern luxury with natural desert beauty",
    },
    {
      id: 5,
      image: "/images/slide/slide6.jpg",
      title: "Urban Sanctuary",
      description:
        "Sophisticated city villa with rooftop terraces and contemporary amenities",
    },
  ];

  // Dynamic slide width based on screen size
  const getSlideWidth = useCallback(() => {
    return isMobile ? 300 : 680; // Mobile: 300px, Desktop: 680px
  }, [isMobile]);

  // Calculate the minimum translate value to prevent empty space
  const getMinTranslate = useCallback(() => {
    const slideWidth = getSlideWidth();
    const margin = isMobile ? 16 : 20; // mr-4 = 16px, mr-5 = 20px
    const totalContentWidth =
      villas.length * slideWidth + (villas.length - 1) * margin;
    const minTranslate = -(totalContentWidth - viewportWidth);

    // Don't allow positive values (which would show empty space on the left)
    return Math.min(0, minTranslate);
  }, [isMobile, getSlideWidth, viewportWidth, villas.length]);

  const maxSlide = villas.length - 1;

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (sliderRef.current?.parentElement) {
        setViewportWidth(sliderRef.current.parentElement.offsetWidth);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateSlide = useCallback(
    (newSlide: number) => {
      const slide = Math.max(0, Math.min(maxSlide, newSlide));
      setCurrentSlide(slide);
    },
    [maxSlide]
  );

  const handleStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartPos(clientX);
    if (sliderRef.current) {
      sliderRef.current.style.transition = "none";
      sliderRef.current.style.cursor = "grabbing";
    }
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;

      const diff = clientX - startPos;
      const newTranslate = prevTranslate + diff;
      const maxTranslate = 0;
      const minTranslate = getMinTranslate();
      const clampedTranslate = Math.max(
        minTranslate,
        Math.min(maxTranslate, newTranslate)
      );

      setCurrentTranslate(clampedTranslate);
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${clampedTranslate}px)`;
      }
    },
    [isDragging, startPos, prevTranslate, getMinTranslate]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.3s ease-out";
      sliderRef.current.style.cursor = "grab";
    }

    const slideWidth = getSlideWidth();
    const minTranslate = getMinTranslate();
    const movedBy = currentTranslate - prevTranslate;
    const threshold = isMobile ? 50 : 100; // Lower threshold for mobile

    // Check if we can move to next/previous slide
    const canMoveNext = -((currentSlide + 1) * slideWidth) >= minTranslate;
    const canMovePrev = currentSlide > 0;

    if (movedBy < -threshold && canMoveNext) {
      updateSlide(currentSlide + 1);
    } else if (movedBy > threshold && canMovePrev) {
      updateSlide(currentSlide - 1);
    } else {
      const newTranslate = Math.max(minTranslate, -currentSlide * slideWidth);
      setCurrentTranslate(newTranslate);
      setPrevTranslate(newTranslate);
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${newTranslate}px)`;
      }
    }
  }, [
    isDragging,
    currentTranslate,
    prevTranslate,
    currentSlide,
    getSlideWidth,
    getMinTranslate,
    updateSlide,
    isMobile,
  ]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let wheelTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      // Only prevent default if user is scrolling horizontally
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          if (e.deltaX > 30) updateSlide(currentSlide + 1);
          else if (e.deltaX < -30) updateSlide(currentSlide - 1);
        }, 50);
      }
      // Allow vertical scrolling to pass through
    };

    const handleTouchStart = (e: TouchEvent) =>
      handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling on mobile during swipe
      handleMove(e.touches[0].clientX);
    };
    const handleMouseDown = (e: MouseEvent) => handleStart(e.clientX);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);

    slider.addEventListener("wheel", handleWheel, { passive: false });
    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchmove", handleTouchMove, { passive: false });
    slider.addEventListener("touchend", handleEnd);
    slider.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);

    return () => {
      clearTimeout(wheelTimeout);
      slider.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleEnd);
      slider.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
    };
  }, [currentSlide, handleStart, handleMove, handleEnd, updateSlide]);

  useEffect(() => {
    const slideWidth = getSlideWidth();
    const newTranslate = -currentSlide * slideWidth;
    const minTranslate = getMinTranslate();

    // Clamp the translate value to prevent empty space
    const clampedTranslate = Math.max(minTranslate, newTranslate);

    setCurrentTranslate(clampedTranslate);
    setPrevTranslate(clampedTranslate);
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${clampedTranslate}px)`;
    }
  }, [currentSlide, getSlideWidth, getMinTranslate]);

  const NavButton = ({
    direction,
    disabled,
    onClick,
  }: {
    direction: "left" | "right";
    disabled: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`absolute ${
        direction === "left" ? "left-2" : "right-2"
      } top-1/2 -translate-y-1/2 ${
        isMobile ? "w-10 h-10" : "w-12 h-12"
      } rounded-full bg-white flex items-center justify-center transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-50"
      } shadow-md z-10`}
      disabled={disabled}
    >
      <svg
        className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-gray-600`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );

  return (
    <div className="w-full mx-auto py-8">
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
          style={{ transform: `translateX(${currentTranslate}px)` }}
        >
          {villas.map((villa) => (
            <div
              key={villa.id}
              className={`flex-shrink-0 select-none ${
                isMobile ? "mr-4" : "mr-5"
              }`}
              style={{ width: isMobile ? "280px" : "660px" }}
            >
              <div className="bg-white overflow-hidden transition-shadow duration-300 group">
                <div
                  className={`relative overflow-hidden ${
                    isMobile ? "h-[200px]" : "h-[460px]"
                  }`}
                >
                  <Image
                    src={villa.image}
                    alt={villa.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    draggable={false}
                    width={isMobile ? 280 : 600}
                    height={isMobile ? 200 : 400}
                    quality={100}
                  />
                </div>
                <div className={`${isMobile ? "p-4" : "p-6"}`}>
                  <h3
                    className={`text-brand mb-2 font-[family-name:var(--font-cormorant-garamond)] transition-colors duration-300 ${
                      isMobile ? "text-lg" : "text-2xl"
                    }`}
                  >
                    {villa.title}
                  </h3>
                  <p
                    className={`text-gray-600 leading-relaxed font-[family-name:var(--font-montserrat)] ${
                      isMobile ? "text-sm" : "text-base"
                    }`}
                  >
                    {villa.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <NavButton
          direction="left"
          disabled={currentSlide === 0}
          onClick={() => updateSlide(currentSlide - 1)}
        />
        <NavButton
          direction="right"
          disabled={currentTranslate <= getMinTranslate()}
          onClick={() => updateSlide(currentSlide + 1)}
        />
      </div>
    </div>
  );
};
