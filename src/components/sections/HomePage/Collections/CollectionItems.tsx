import Image from "next/image";
import React from "react";
import { CollectionItem, CollectionItemCardProps } from "./types";

export const CollectionItems: React.FC = () => {
  const items: CollectionItem[] = [
    {
      imageSrc: "/images/collections/italy.jpg",
      altText: "Collection 1",
      title: "Villa Monastero",
      location: "Lake Como, Italy",
    },
    {
      imageSrc: "/images/collections/img2.jpg",
      altText: "Collection 2",
      title: "Villa degli Ulivi",
      location: "Navigli, Italy",
    },
    {
      imageSrc: "/images/collections/img4.jpg",
      altText: "Collection 3",
      title: "Villa Serenissima",
      location: "Varenna, Italy",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <CollectionItemCard key={index} item={item} />
      ))}
    </div>
  );
};

const CollectionItemCard: React.FC<CollectionItemCardProps> = ({ item }) => {
  return (
    <div className="flex flex-col gap-4 group">
      <div className="relative overflow-hidden">
        <Image
          src={item.imageSrc}
          alt={item.altText}
          width={500}
          height={500}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-neutral-800/50 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-[family-name:var(--font-cormorant-garamond)] text-lg">
            View Details
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-neutral-500 font-[family-name:var(--font-cormorant-garamond)]">
          {item.title}
        </p>
        <p className="text-brand font-[family-name:var(--font-montserrat)]">
          {item.location}
        </p>
      </div>
    </div>
  );
};
