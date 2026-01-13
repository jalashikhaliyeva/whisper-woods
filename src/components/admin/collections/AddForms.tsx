"use client";
import { FormEvent, ChangeEvent } from "react";
import {
  FormField,
  Input,
  Select,
  AdminButton,
} from "@/components/ui/form-controls";

type CategoryOption = { value: string; label: string };

type AddCategoryFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  loading: boolean;
};

export const AddCategoryForm = ({
  value,
  onChange,
  onSubmit,
  loading,
}: AddCategoryFormProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField label="Category Name">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Spring Collection"
        />
      </FormField>
      <AdminButton
        type="submit"
        disabled={loading || !value.trim()}
        className="w-full"
      >
        {loading ? "Adding..." : "Add Category"}
      </AdminButton>
    </form>
  </div>
);

type AddItemFormProps = {
  title: string;
  location: string;
  selectedCategory: string;
  categoryOptions: CategoryOption[];
  onTitleChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  loading: boolean;
  canSubmit: boolean;
};

export const AddItemForm = ({
  title,
  location,
  selectedCategory,
  categoryOptions,
  onTitleChange,
  onLocationChange,
  onCategoryChange,
  onFileChange,
  onSubmit,
  loading,
  canSubmit,
}: AddItemFormProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField label="Category">
        <Select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={categoryOptions}
          placeholder="Select Category"
          className="w-full"
        />
      </FormField>
      <FormField label="Title">
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="e.g., Villa Monastero"
        />
      </FormField>
      <FormField label="Location">
        <Input
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="e.g., Lake Como, Italy"
        />
      </FormField>
      <FormField label="Image">
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
      </FormField>
      <AdminButton
        type="submit"
        variant="green"
        disabled={loading || !canSubmit}
        className="w-full"
      >
        {loading ? "Adding..." : "Add Item"}
      </AdminButton>
    </form>
  </div>
);
