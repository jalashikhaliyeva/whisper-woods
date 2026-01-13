"use client";
import { useState } from "react";
import { useCollectionAdmin } from "@/hooks/useCollectionAdmin";
import {
  ErrorAlert,
  LoadingSpinner,
  Select,
} from "@/components/ui/form-controls";
import {
  AddCategoryForm,
  AddItemForm,
  ItemCard,
} from "@/components/admin/collections";

export default function CollectionAdmin() {
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");
  const {
    items,
    selectedCategory,
    loading,
    error,
    categoryOptions,
    newCategory,
    newItem,
    selectedFile,
    edit,
    setSelectedCategory,
    setNewCategory,
    setSelectedFile,
    setError,
    updateNewItem,
    updateEdit,
    clearEditFile,
    handleAddCategory,
    handleAddItem,
    handleDeleteItem,
    handleEditItem,
    handleEditFileChange,
    handleSaveEdit,
    handleCancelEdit,
    getCategoryName,
  } = useCollectionAdmin();

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
          Collections
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Manage your villa galleries and categories
        </p>
      </div>

      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab("add")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "add"
              ? "text-neutral-900"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          Add New
          {activeTab === "add" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "manage"
              ? "text-neutral-900"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          Manage
          <span className="ml-1.5 text-neutral-400">({items.length})</span>
          {activeTab === "manage" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
          )}
        </button>
      </div>

      {activeTab === "add" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AddCategoryForm
            value={newCategory}
            onChange={setNewCategory}
            onSubmit={handleAddCategory}
            loading={loading}
          />
          <AddItemForm
            title={newItem.title}
            location={newItem.location}
            selectedCategory={selectedCategory}
            categoryOptions={categoryOptions}
            onTitleChange={(v) => updateNewItem("title", v)}
            onLocationChange={(v) => updateNewItem("location", v)}
            onCategoryChange={setSelectedCategory}
            onFileChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            onSubmit={handleAddItem}
            loading={loading}
            canSubmit={
              !!(
                newItem.title.trim() &&
                newItem.location.trim() &&
                selectedFile &&
                selectedCategory
              )
            }
          />
        </div>
      )}

      {activeTab === "manage" && (
        <div className="space-y-6">
          {/* Filter */}
          <div className="flex items-center gap-4 p-4 bg-white border border-neutral-200">
            <span className="text-sm text-neutral-600">Filter</span>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categoryOptions}
              placeholder="All categories"
              className="min-w-[200px]"
            />
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-neutral-400 text-sm">
              No items found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  edit={edit}
                  categoryOptions={categoryOptions}
                  loading={loading}
                  getCategoryName={getCategoryName}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                  onEditFileChange={handleEditFileChange}
                  onClearEditFile={clearEditFile}
                  onUpdateEdit={updateEdit}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
