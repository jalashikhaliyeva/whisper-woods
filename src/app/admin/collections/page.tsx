"use client";
// components/admin/CollectionAdmin.tsx
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { CollectionService } from "@/lib/services/collectionService";
import { CollectionCategory, CollectionItem } from "@/types/collection";

export default function CollectionAdmin() {
  const [categories, setCategories] = useState<CollectionCategory[]>([]);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");

  // Form states
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemLocation, setNewItemLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Edit states
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      const loadedCategories = await CollectionService.loadCategories();
      setCategories(loadedCategories);
      if (loadedCategories.length > 0 && !selectedCategory) {
        setSelectedCategory(loadedCategories[0].slug);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
    }
  }, [selectedCategory]);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const loadedItems = await CollectionService.loadCollectionItems(
        selectedCategory
      );
      setItems(loadedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (selectedCategory) {
      loadItems();
    }
  }, [selectedCategory, loadItems]);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setLoading(true);
      const slug = newCategoryName.toLowerCase().replace(/\s+/g, "-");
      await CollectionService.createCategory(
        newCategoryName,
        slug,
        categories.length + 1
      );
      setNewCategoryName("");
      await loadCategories();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newItemTitle.trim() ||
      !newItemLocation.trim() ||
      !selectedFile ||
      !selectedCategory
    )
      return;

    try {
      setLoading(true);
      const validation = CollectionService.validateFile(selectedFile);
      if (!validation.isValid) {
        setError(validation.error || "Invalid file");
        return;
      }

      await CollectionService.uploadCollectionItem(
        selectedFile,
        newItemTitle,
        newItemLocation,
        selectedCategory,
        items.length
      );

      setNewItemTitle("");
      setNewItemLocation("");
      setSelectedFile(null);
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (item: CollectionItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;

    try {
      setLoading(true);
      await CollectionService.deleteCollectionItem(item);
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (item: CollectionItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditLocation(item.location);
    setEditCategory(item.category);
    setEditFile(null);
    setEditImagePreview(null);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setEditFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setEditImagePreview(null);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editingItem ||
      !editTitle.trim() ||
      !editLocation.trim() ||
      !editCategory
    )
      return;

    try {
      setLoading(true);

      // Validate new file if one is selected
      if (editFile) {
        const validation = CollectionService.validateFile(editFile);
        if (!validation.isValid) {
          setError(validation.error || "Invalid file");
          return;
        }
      }

      await CollectionService.updateCollectionItemWithImage(
        editingItem,
        {
          title: editTitle.trim(),
          location: editLocation.trim(),
          category: editCategory,
          altText: editTitle.trim(),
        },
        editFile
      );

      setEditingItem(null);
      setEditTitle("");
      setEditLocation("");
      setEditCategory("");
      setEditFile(null);
      setEditImagePreview(null);
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditTitle("");
    setEditLocation("");
    setEditCategory("");
    setEditFile(null);
    setEditImagePreview(null);
  };

  const getCategoryName = (slug: string) => {
    const category = categories.find((cat) => cat.slug === slug);
    return category ? category.name : slug;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Collection Management</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("add")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "add"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Add New Items
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "manage"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Manage Items ({items.length})
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "add" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Category Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Spring Collection"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !newCategoryName.trim()}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : "Add Category"}
              </button>
            </form>
          </div>

          {/* Add Item Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Villa Monastero"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={newItemLocation}
                  onChange={(e) => setNewItemLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Lake Como, Italy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={
                  loading ||
                  !newItemTitle.trim() ||
                  !newItemLocation.trim() ||
                  !selectedFile ||
                  !selectedCategory
                }
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : "Add Item"}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === "manage" && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Filter by Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Items List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading items...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No items found for the selected category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9 relative w-full h-48">
                    <Image
                      src={item.imageSrc}
                      alt={item.altText}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    {editingItem?.id === item.id ? (
                      <form onSubmit={handleSaveEdit} className="space-y-3">
                        {/* Image Preview and Change */}
                        <div>
                          <label className="block text-xs font-medium mb-1">
                            Image
                          </label>
                          <div className="relative w-full h-24 mb-2 rounded overflow-hidden border border-gray-200">
                            <Image
                              src={editImagePreview || item.imageSrc}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                            {editImagePreview && (
                              <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                                New
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <label className="flex-1 cursor-pointer">
                              <span className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded text-sm border border-gray-300 transition-colors">
                                {editFile ? "Change Image" : "Select New Image"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleEditFileChange}
                                className="hidden"
                              />
                            </label>
                            {editFile && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditFile(null);
                                  setEditImagePreview(null);
                                }}
                                className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition-colors"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                          {editFile && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {editFile.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={editLocation}
                            onChange={(e) => setEditLocation(e.target.value)}
                            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">
                            Category
                          </label>
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.slug}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-green-500 text-white p-2 rounded text-sm hover:bg-green-600 disabled:opacity-50"
                          >
                            {loading ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={loading}
                            className="flex-1 bg-gray-500 text-white p-2 rounded text-sm hover:bg-gray-600 disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h3 className="font-semibold text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.location}
                        </p>
                        <p className="text-gray-500 text-xs mb-3">
                          Category: {getCategoryName(item.category)}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditItem(item)}
                            disabled={loading}
                            className="flex-1 bg-blue-500 text-white p-2 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item)}
                            disabled={loading}
                            className="flex-1 bg-red-500 text-white p-2 rounded text-sm hover:bg-red-600 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
