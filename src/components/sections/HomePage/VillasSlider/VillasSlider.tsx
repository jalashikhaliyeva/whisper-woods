"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

export const VillasSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
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

  const slideWidth = 600; // 400px + 20px gap
  const maxSlide = villas.length - 1;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      setStartPos(e.touches[0].clientX);
      slider.style.transition = "none";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const currentPosition = e.touches[0].clientX;
      const diff = currentPosition - startPos;
      setCurrentTranslate(prevTranslate + diff);

      slider.style.transform = `translateX(${currentTranslate}px)`;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      slider.style.transition = "transform 0.3s ease-out";

      const movedBy = currentTranslate - prevTranslate;

      if (movedBy < -100 && currentSlide < maxSlide) {
        setCurrentSlide((prev) => prev + 1);
      } else if (movedBy > 100 && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }

      setCurrentTranslate(-currentSlide * slideWidth);
      setPrevTranslate(-currentSlide * slideWidth);
    };

    // Mouse events for desktop
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartPos(e.clientX);
      slider.style.transition = "none";
      slider.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const currentPosition = e.clientX;
      const diff = currentPosition - startPos;
      setCurrentTranslate(prevTranslate + diff);

      slider.style.transform = `translateX(${currentTranslate}px)`;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      slider.style.transition = "transform 0.3s ease-out";
      slider.style.cursor = "grab";

      const movedBy = currentTranslate - prevTranslate;

      if (movedBy < -100 && currentSlide < maxSlide) {
        setCurrentSlide((prev) => prev + 1);
      } else if (movedBy > 100 && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }

      setCurrentTranslate(-currentSlide * slideWidth);
      setPrevTranslate(-currentSlide * slideWidth);
    };

    // Touch events
    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    // Mouse events
    slider.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
      slider.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    startPos,
    currentTranslate,
    prevTranslate,
    currentSlide,
    maxSlide,
  ]);

  useEffect(() => {
    const newTranslate = -currentSlide * slideWidth;
    setCurrentTranslate(newTranslate);
    setPrevTranslate(newTranslate);

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full mx-auto  py-8">
      <div className="relative overflow-hidden">
        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
          style={{ transform: `translateX(${currentTranslate}px)` }}
        >
          {villas.map((villa, index) => (
            <div
              key={villa.id}
              className="flex-shrink-0 w-96 mr-5 select-none"
              style={{ width: "660px" }}
            >
              <div className="bg-white  overflow-hidden  transition-shadow duration-300 group">
                {/* Image Container */}
                <div className="relative h-[460px] overflow-hidden">
                  <Image
                    src={villa.image}
                    alt={villa.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    draggable={false}
                    width={600}
                    height={400}
                    quality={100}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl  text-brand mb-2 font-[family-name:var(--font-cormorant-garamond)] transition-colors duration-300">
                    {villa.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-[family-name:var(--font-montserrat)]">
                    {villa.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => currentSlide > 0 && setCurrentSlide(currentSlide - 1)}
          className={`absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white  flex items-center justify-center transition-all duration-300 ${
            currentSlide === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-50 "
          }`}
          disabled={currentSlide === 0}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() =>
            currentSlide < maxSlide && setCurrentSlide(currentSlide + 1)
          }
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all duration-300 ${
            currentSlide === maxSlide
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-50 "
          }`}
          disabled={currentSlide === maxSlide}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
