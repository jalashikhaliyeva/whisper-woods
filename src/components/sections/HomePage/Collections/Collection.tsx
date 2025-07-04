// components/collection/Collection.tsx
"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { CollectionItems } from "./CollectionItems";
import { Heading } from "./Heading";
import { CollectionCategory } from "@/types/collection";
import { CollectionService } from "@/lib/services/collectionService";

export const Collection: React.FC = () => {
  const [categories, setCategories] = useState<CollectionCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeCollection = async () => {
      try {
        setLoading(true);
        setError(null);

        // Initialize default categories if none exist
        await CollectionService.initializeDefaultCategories();

        // Load categories
        const loadedCategories = await CollectionService.loadCategories();
        setCategories(loadedCategories);

        // Set the first category as selected, or 'all' if no categories
        if (loadedCategories.length > 0) {
          setSelectedCategory(loadedCategories[0].slug);
        }
      } catch (err) {
        console.error("Error initializing collection:", err);
        setError(
          err instanceof Error ? err.message : "Failed to initialize collection"
        );
      } finally {
        setLoading(false);
      }
    };

    initializeCollection();
  }, []);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
  };

  if (loading) {
    return (
      <Container>
        <div className="py-14">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-8 mx-auto w-64"></div>
              <div className="flex justify-center space-x-4 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-20"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <p className="text-lg font-semibold">Error loading collection</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brand text-white rounded hover:bg-brand/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Heading
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <CollectionItems selectedCategory={selectedCategory} />
    </Container>
  );
};
