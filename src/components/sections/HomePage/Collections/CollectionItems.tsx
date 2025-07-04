// components/collection/CollectionItems.tsx
'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CollectionItem, CollectionItemCardProps, CollectionItemsProps } from "@/types/collection";
import { CollectionService } from "@/lib/services/collectionService";

export const CollectionItems: React.FC<CollectionItemsProps> = ({ selectedCategory }) => {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadedItems = await CollectionService.loadCollectionItems(selectedCategory);
        setItems(loadedItems);
      } catch (err) {
        console.error("Error loading collection items:", err);
        setError(err instanceof Error ? err.message : "Failed to load collection items");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <p className="text-lg font-semibold">Error loading collections</p>
          <p className="text-sm">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-brand text-white rounded hover:bg-brand/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg mb-4">No items found in this collection</p>
        <p className="text-sm">Items will appear here when added to the selected category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <CollectionItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

const CollectionItemCard: React.FC<CollectionItemCardProps> = ({ item }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col gap-4 group">
      <div className="relative overflow-hidden aspect-square">
        {!imageError ? (
          <Image
            src={item.imageSrc}
            alt={item.altText}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image not available</span>
          </div>
        )}
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