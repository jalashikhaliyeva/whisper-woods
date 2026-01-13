"use client";
import { FormEvent, ChangeEvent } from "react";
import {
  FormField,
  Input,
  Select,
  AdminButton,
  FileInput,
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
  <div className="p-6 bg-white border border-neutral-200">
    <h2 className="font-medium text-neutral-900 mb-6">New Category</h2>
    <form onSubmit={onSubmit} className="space-y-5">
      <FormField label="Category Name">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter category name"
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
  <div className="p-6 bg-white border border-neutral-200">
    <h2 className="font-medium text-neutral-900 mb-6">New Item</h2>
    <form onSubmit={onSubmit} className="space-y-5">
      <FormField label="Category">
        <Select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={categoryOptions}
          placeholder="Select category"
          className="w-full"
        />
      </FormField>
      <FormField label="Title">
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter title"
        />
      </FormField>
      <FormField label="Location">
        <Input
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Enter location"
        />
      </FormField>
      <FormField label="Image">
        <FileInput onChange={onFileChange} />
      </FormField>
      <AdminButton
        type="submit"
        disabled={loading || !canSubmit}
        className="w-full"
      >
        {loading ? "Adding..." : "Add Item"}
      </AdminButton>
    </form>
  </div>
);
