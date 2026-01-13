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

  const TabButton = ({
    tab,
    label,
  }: {
    tab: "add" | "manage";
    label: string;
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`py-2 px-1 border-b-2 font-medium text-sm ${
        activeTab === tab
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Collection Management</h1>

      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <TabButton tab="add" label="Add New Items" />
          <TabButton tab="manage" label={`Manage Items (${items.length})`} />
        </nav>
      </div>

      {activeTab === "add" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
            <label className="text-sm font-medium">Filter by Category:</label>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categoryOptions}
              placeholder="All Categories"
            />
          </div>

          {loading ? (
            <LoadingSpinner text="Loading items..." />
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items found for the selected category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
