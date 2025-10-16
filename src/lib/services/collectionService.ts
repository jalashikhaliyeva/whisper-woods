// services/collectionService.ts
import { CollectionCategory, CollectionItem } from "@/types/collection";
import { FirebaseStorageService } from "./firebaseStorageService";

export class CollectionService {
  private static readonly ITEMS_STORAGE_PATH = "collection-items";
  private static readonly ITEMS_DB_PATH = "collection-items";
  private static readonly CATEGORIES_DB_PATH = "collection-categories";

  // Category methods
  static async loadCategories(): Promise<CollectionCategory[]> {
    try {
      const categories = await FirebaseStorageService.loadFiles<CollectionCategory>(
        this.CATEGORIES_DB_PATH
      );
      return categories
        .filter(cat => cat.isActive)
        .sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error("Error loading categories:", error);
      throw new Error("Failed to load categories. Please check your Firebase configuration.");
    }
  }

  static async createCategory(name: string, slug: string, order: number): Promise<CollectionCategory> {
    try {
      const newCategory: CollectionCategory = {
        id: FirebaseStorageService.generateId(),
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        order,
        isActive: true,
        createdAt: new Date().toISOString(),
        url: '', // No file for category, so empty string
        fileName: '',
        fileSize: 0,
        fileType: '',
      };

      await FirebaseStorageService.saveFileMetadata(this.CATEGORIES_DB_PATH, newCategory);
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error(`Error creating category: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async updateCategory(categoryId: string, updates: Partial<CollectionCategory>): Promise<void> {
    try {
      await FirebaseStorageService.updateFileMetadata(this.CATEGORIES_DB_PATH, categoryId, updates);
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error(`Error updating category: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async deleteCategory(categoryId: string): Promise<void> {
    try {
      await FirebaseStorageService.updateFileMetadata(this.CATEGORIES_DB_PATH, categoryId, { isActive: false });
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error(`Error deleting category: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  // Collection Items methods
  static async loadCollectionItems(category?: string): Promise<CollectionItem[]> {
    try {
      const items = await FirebaseStorageService.loadFiles<CollectionItem>(
        this.ITEMS_DB_PATH
      );
      
      let filteredItems = items;
      if (category && category !== 'all') {
        filteredItems = items.filter(item => item.category === category);
      }
      
      return filteredItems.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error("Error loading collection items:", error);
      throw new Error("Failed to load collection items. Please check your Firebase configuration.");
    }
  }

  static async uploadCollectionItem(
    file: File,
    title: string,
    location: string,
    category: string,
    currentCount: number
  ): Promise<CollectionItem> {
    try {
      console.log("Starting collection item upload...", {
        fileName: file.name,
        fileSize: file.size,
        category,
      });

      const { downloadURL, fileName } = await FirebaseStorageService.uploadFile(
        file,
        this.ITEMS_STORAGE_PATH
      );

      console.log("Upload successful, got download URL:", downloadURL);

      const newItem: CollectionItem = {
        id: FirebaseStorageService.generateId(),
        imageSrc: downloadURL,
        altText: title.trim(),
        title: title.trim(),
        location: location.trim(),
        category: category.trim(),
        order: currentCount + 1,
        createdAt: new Date().toISOString(),
        url: downloadURL,
        fileName: fileName || '',
        fileSize: file.size || 0,
        fileType: file.type || '',
      };

      console.log("Saving to database...", newItem);

      await FirebaseStorageService.saveFileMetadata(this.ITEMS_DB_PATH, newItem);

      console.log("Database save successful");
      return newItem;
    } catch (error) {
      console.error("Error uploading collection item:", error);
      throw new Error(`Error uploading collection item: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async deleteCollectionItem(item: CollectionItem): Promise<void> {
    try {
      await FirebaseStorageService.deleteFile(
        item.imageSrc,
        this.ITEMS_DB_PATH,
        item.id
      );
    } catch (error) {
      console.error("Error deleting collection item:", error);
      throw new Error(`Error deleting collection item: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static async updateCollectionItem(
    itemId: string,
    updates: Partial<CollectionItem>
  ): Promise<void> {
    try {
      await FirebaseStorageService.updateFileMetadata(this.ITEMS_DB_PATH, itemId, updates);
    } catch (error) {
      console.error("Error updating collection item:", error);
      throw new Error(`Error updating collection item: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static validateFile(file: File): { isValid: boolean; error?: string } {
    if (!file.type.startsWith("image/")) {
      return { isValid: false, error: "Please select a valid image file" };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { isValid: false, error: "File size must be less than 5MB" };
    }

    return { isValid: true };
  }

  // Initialize default categories (call this once to set up your database)
  static async initializeDefaultCategories(): Promise<void> {
    try {
      const existingCategories = await this.loadCategories();
      if (existingCategories.length > 0) {
        console.log("Categories already exist, skipping initialization");
        return;
      }

      const defaultCategories = [
        { name: "Summer Deals", slug: "summer-deals", order: 1 },
        { name: "Italian Summer", slug: "italian-summer", order: 2 },
        { name: "Winter Deals", slug: "winter-deals", order: 3 },
        { name: "New Deals", slug: "new-deals", order: 4 },
      ];

      for (const category of defaultCategories) {
        await this.createCategory(category.name, category.slug, category.order);
      }

      console.log("Default categories initialized successfully");
    } catch (error) {
      console.error("Error initializing default categories:", error);
      throw new Error("Failed to initialize default categories");
    }
  }
}