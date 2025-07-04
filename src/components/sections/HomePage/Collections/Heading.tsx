
import React from "react";
import { HeadingProps } from "@/types/collection";

export const Heading: React.FC<HeadingProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  const handleCategoryClick = (categorySlug: string) => {
    onCategoryChange(categorySlug);
  };

  return (
    <div className="py-14">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-row items-center justify-between">
        {categories.slice(0, 2).map((category) => (
          <p
            key={category.id}
            className={`font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300 ${
              selectedCategory === category.slug ? 'text-brand' : ''
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
            <span 
              className={`absolute bottom-0 left-0 h-0.5 bg-brand transition-all duration-300 ${
                selectedCategory === category.slug ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </p>
        ))}
        
        <span className="font-[family-name:var(--font-cormorant-garamond)] text-6xl">
          The Collections
        </span>
        
        {categories.slice(2, 4).map((category) => (
          <p
            key={category.id}
            className={`font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300 ${
              selectedCategory === category.slug ? 'text-brand' : ''
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
            <span 
              className={`absolute bottom-0 left-0 h-0.5 bg-brand transition-all duration-300 ${
                selectedCategory === category.slug ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </p>
        ))}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center">
        {/* Main title centered */}
        <span className="font-[family-name:var(--font-cormorant-garamond)] text-4xl sm:text-5xl text-center mb-6">
          The Collections
        </span>
        
        {/* Scrollable menu items */}
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-6 px-4 min-w-max">
            {categories.map((category) => (
              <p
                key={category.id}
                className={`font-[family-name:var(--font-montserrat)] relative group cursor-pointer transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.slug ? 'text-brand' : ''
                }`}
                onClick={() => handleCategoryClick(category.slug)}
              >
                {category.name}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand transition-all duration-300 ${
                    selectedCategory === category.slug ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};