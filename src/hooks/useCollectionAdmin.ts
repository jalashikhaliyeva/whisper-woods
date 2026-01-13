"use client";
import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { CollectionService } from "@/lib/services/collectionService";
import { CollectionCategory, CollectionItem } from "@/types/collection";

export type EditState = {
  item: CollectionItem | null;
  title: string;
  location: string;
  category: string;
  file: File | null;
  preview: string | null;
};

const initialEditState: EditState = {
  item: null,
  title: "",
  location: "",
  category: "",
  file: null,
  preview: null,
};

export function useCollectionAdmin() {
  const [categories, setCategories] = useState<CollectionCategory[]>([]);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState({ title: "", location: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [edit, setEdit] = useState<EditState>(initialEditState);

  const categoryOptions = categories.map((c) => ({
    value: c.slug,
    label: c.name,
  }));
  const getCategoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  const handleError = (err: unknown, fallback: string) => {
    setError(err instanceof Error ? err.message : fallback);
  };

  const withLoading = async (fn: () => Promise<void>) => {
    try {
      setLoading(true);
      await fn();
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = useCallback(async () => {
    try {
      const loaded = await CollectionService.loadCategories();
      setCategories(loaded);
      if (loaded.length > 0 && !selectedCategory)
        setSelectedCategory(loaded[0].slug);
    } catch (err) {
      handleError(err, "Failed to load categories");
    }
  }, [selectedCategory]);

  const loadItems = useCallback(async () => {
    if (!selectedCategory) return;
    try {
      setLoading(true);
      setItems(await CollectionService.loadCollectionItems(selectedCategory));
    } catch (err) {
      handleError(err, "Failed to load items");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  useEffect(() => {
    loadItems();
  }, [selectedCategory, loadItems]);

  // Category handlers
  const handleAddCategory = (e: FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    withLoading(async () => {
      const slug = newCategory.toLowerCase().replace(/\s+/g, "-");
      await CollectionService.createCategory(
        newCategory,
        slug,
        categories.length + 1
      );
      setNewCategory("");
      await loadCategories();
    }).catch((err) => handleError(err, "Failed to create category"));
  };

  // Item handlers
  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    if (
      !newItem.title.trim() ||
      !newItem.location.trim() ||
      !selectedFile ||
      !selectedCategory
    )
      return;
    withLoading(async () => {
      const validation = CollectionService.validateFile(selectedFile);
      if (!validation.isValid) {
        setError(validation.error || "Invalid file");
        return;
      }
      await CollectionService.uploadCollectionItem(
        selectedFile,
        newItem.title,
        newItem.location,
        selectedCategory,
        items.length
      );
      setNewItem({ title: "", location: "" });
      setSelectedFile(null);
      await loadItems();
    }).catch((err) => handleError(err, "Failed to add item"));
  };

  const handleDeleteItem = (item: CollectionItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;
    withLoading(async () => {
      await CollectionService.deleteCollectionItem(item);
      await loadItems();
    }).catch((err) => handleError(err, "Failed to delete item"));
  };

  // Edit handlers
  const handleEditItem = (item: CollectionItem) => {
    setEdit({
      item,
      title: item.title,
      location: item.location,
      category: item.category,
      file: null,
      preview: null,
    });
  };

  const handleEditFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setEdit((prev) => ({
          ...prev,
          file,
          preview: ev.target?.result as string,
        }));
      reader.readAsDataURL(file);
    } else {
      setEdit((prev) => ({ ...prev, file: null, preview: null }));
    }
  };

  const handleSaveEdit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !edit.item ||
      !edit.title.trim() ||
      !edit.location.trim() ||
      !edit.category
    )
      return;
    withLoading(async () => {
      if (edit.file) {
        const validation = CollectionService.validateFile(edit.file);
        if (!validation.isValid) {
          setError(validation.error || "Invalid file");
          return;
        }
      }
      await CollectionService.updateCollectionItemWithImage(
        edit.item!,
        {
          title: edit.title.trim(),
          location: edit.location.trim(),
          category: edit.category,
          altText: edit.title.trim(),
        },
        edit.file
      );
      setEdit(initialEditState);
      await loadItems();
    }).catch((err) => handleError(err, "Failed to update item"));
  };

  const handleCancelEdit = () => setEdit(initialEditState);
  const clearEditFile = () =>
    setEdit((p) => ({ ...p, file: null, preview: null }));
  const updateEdit = (field: keyof EditState, value: string) =>
    setEdit((p) => ({ ...p, [field]: value }));
  const updateNewItem = (field: "title" | "location", value: string) =>
    setNewItem((p) => ({ ...p, [field]: value }));

  return {
    // State
    categories,
    items,
    selectedCategory,
    loading,
    error,
    categoryOptions,
    newCategory,
    newItem,
    selectedFile,
    edit,
    // Setters
    setSelectedCategory,
    setNewCategory,
    setSelectedFile,
    setError,
    updateNewItem,
    updateEdit,
    clearEditFile,
    // Handlers
    handleAddCategory,
    handleAddItem,
    handleDeleteItem,
    handleEditItem,
    handleEditFileChange,
    handleSaveEdit,
    handleCancelEdit,
    getCategoryName,
  };
}
