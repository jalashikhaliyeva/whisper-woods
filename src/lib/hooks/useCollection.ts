// hooks/useCollection.ts
import { useState, useEffect } from 'react';
import { CollectionCategory, CollectionItem } from '@/types/collection';
import { CollectionService } from '@/lib/services/collectionService';

export const useCollection = () => {
  const [categories, setCategories] = useState<CollectionCategory[]>([]);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize collection
  const initializeCollection = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize default categories if none exist
      await CollectionService.initializeDefaultCategories();
      
      // Load categories
      const loadedCategories = await CollectionService.loadCategories();
      setCategories(loadedCategories);
      
      // Set the first category as selected
      if (loadedCategories.length > 0) {
        setSelectedCategory(loadedCategories[0].slug);
      }
    } catch (err) {
      console.error("Error initializing collection:", err);
      setError(err instanceof Error ? err.message : "Failed to initialize collection");
    } finally {
      setLoading(false);
    }
  };

  // Load items for selected category
  const loadItems = async (categorySlug?: string) => {
    try {
      setLoading(true);
      const category = categorySlug || selectedCategory;
      const loadedItems = await CollectionService.loadCollectionItems(category);
      setItems(loadedItems);
    } catch (err) {
      console.error("Error loading items:", err);
      setError(err instanceof Error ? err.message : "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const loadedCategories = await CollectionService.loadCategories();
      setCategories(loadedCategories);
    } catch (err) {
      console.error("Error loading categories:", err);
      setError(err instanceof Error ? err.message : "Failed to load categories");
    }
  };

  // Add new category
  const addCategory = async (name: string, slug: string) => {
    try {
      const order = categories.length + 1;
      await CollectionService.createCategory(name, slug, order);
      await loadCategories();
      return true;
    } catch (err) {
      console.error("Error adding category:", err);
      setError(err instanceof Error ? err.message : "Failed to add category");
      return false;
    }
  };

  // Add new item
  const addItem = async (
    file: File,
    title: string,
    location: string,
    category: string
  ) => {
    try {
      const validation = CollectionService.validateFile(file);
      if (!validation.isValid) {
        setError(validation.error || "Invalid file");
        return false;
      }

      await CollectionService.uploadCollectionItem(
        file,
        title,
        location,
        category,
        items.length
      );
      
      await loadItems(category);
      return true;
    } catch (err) {
      console.error("Error adding item:", err);
      setError(err instanceof Error ? err.message : "Failed to add item");
      return false;
    }
  };

  // Delete item
  const deleteItem = async (item: CollectionItem) => {
    try {
      await CollectionService.deleteCollectionItem(item);
      await loadItems();
      return true;
    } catch (err) {
      console.error("Error deleting item:", err);
      setError(err instanceof Error ? err.message : "Failed to delete item");
      return false;
    }
  };

  // Update item
  const updateItem = async (itemId: string, updates: Partial<CollectionItem>) => {
    try {
      await CollectionService.updateCollectionItem(itemId, updates);
      await loadItems();
      return true;
    } catch (err) {
      console.error("Error updating item:", err);
      setError(err instanceof Error ? err.message : "Failed to update item");
      return false;
    }
  };

  // Change selected category
  const changeCategory = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Initialize on mount
  useEffect(() => {
    initializeCollection();
  }, []);

  // Load items when category changes
  useEffect(() => {
    if (selectedCategory && categories.length > 0) {
      loadItems();
    }
  }, [selectedCategory]);

  return {
    // State
    categories,
    items,
    selectedCategory,
    loading,
    error,
    
    // Actions
    initializeCollection,
    loadItems,
    loadCategories,
    addCategory,
    addItem,
    deleteItem,
    updateItem,
    changeCategory,
    clearError,
  };
};