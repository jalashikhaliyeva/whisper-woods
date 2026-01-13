"use client";
import { FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { CollectionItem } from "@/types/collection";
import {
  FormField,
  Input,
  Select,
  AdminButton,
} from "@/components/ui/form-controls";
import { EditState } from "@/hooks/useCollectionAdmin";

type CategoryOption = { value: string; label: string };

type ItemCardProps = {
  item: CollectionItem;
  edit: EditState;
  categoryOptions: CategoryOption[];
  loading: boolean;
  getCategoryName: (slug: string) => string;
  onEdit: (item: CollectionItem) => void;
  onDelete: (item: CollectionItem) => void;
  onSaveEdit: (e: FormEvent) => void;
  onCancelEdit: () => void;
  onEditFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearEditFile: () => void;
  onUpdateEdit: (field: keyof EditState, value: string) => void;
};

export const ItemCard = ({
  item,
  edit,
  categoryOptions,
  loading,
  getCategoryName,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  onEditFileChange,
  onClearEditFile,
  onUpdateEdit,
}: ItemCardProps) => {
  const isEditing = edit.item?.id === item.id;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={item.imageSrc}
          alt={item.altText}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        {isEditing ? (
          <EditForm
            item={item}
            edit={edit}
            categoryOptions={categoryOptions}
            loading={loading}
            onSave={onSaveEdit}
            onCancel={onCancelEdit}
            onFileChange={onEditFileChange}
            onClearFile={onClearEditFile}
            onUpdateEdit={onUpdateEdit}
          />
        ) : (
          <ItemDisplay
            item={item}
            categoryName={getCategoryName(item.category)}
            loading={loading}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        )}
      </div>
    </div>
  );
};

// Sub-components
const ItemDisplay = ({
  item,
  categoryName,
  loading,
  onEdit,
  onDelete,
}: {
  item: CollectionItem;
  categoryName: string;
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <>
    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
    <p className="text-gray-600 text-sm mb-2">{item.location}</p>
    <p className="text-gray-500 text-xs mb-3">Category: {categoryName}</p>
    <div className="flex gap-2">
      <AdminButton
        onClick={onEdit}
        disabled={loading}
        className="flex-1 text-sm"
      >
        Edit
      </AdminButton>
      <AdminButton
        onClick={onDelete}
        variant="red"
        disabled={loading}
        className="flex-1 text-sm"
      >
        Delete
      </AdminButton>
    </div>
  </>
);

const EditForm = ({
  item,
  edit,
  categoryOptions,
  loading,
  onSave,
  onCancel,
  onFileChange,
  onClearFile,
  onUpdateEdit,
}: {
  item: CollectionItem;
  edit: EditState;
  categoryOptions: CategoryOption[];
  loading: boolean;
  onSave: (e: FormEvent) => void;
  onCancel: () => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
  onUpdateEdit: (field: keyof EditState, value: string) => void;
}) => (
  <form onSubmit={onSave} className="space-y-3">
    <div>
      <label className="block text-xs font-medium mb-1">Image</label>
      <div className="relative w-full h-24 mb-2 rounded overflow-hidden border border-gray-200">
        <Image
          src={edit.preview || item.imageSrc}
          alt="Preview"
          fill
          className="object-cover"
        />
        {edit.preview && (
          <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
            New
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <label className="flex-1 cursor-pointer">
          <span className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded text-sm border border-gray-300 transition-colors">
            {edit.file ? "Change Image" : "Select New Image"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
        {edit.file && (
          <button
            type="button"
            onClick={onClearFile}
            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition-colors"
          >
            ✕
          </button>
        )}
      </div>
      {edit.file && (
        <p className="text-xs text-gray-500 mt-1 truncate">{edit.file.name}</p>
      )}
    </div>
    <FormField label="Title" small>
      <Input
        value={edit.title}
        onChange={(e) => onUpdateEdit("title", e.target.value)}
        className="text-sm"
      />
    </FormField>
    <FormField label="Location" small>
      <Input
        value={edit.location}
        onChange={(e) => onUpdateEdit("location", e.target.value)}
        className="text-sm"
      />
    </FormField>
    <FormField label="Category" small>
      <Select
        value={edit.category}
        onChange={(e) => onUpdateEdit("category", e.target.value)}
        options={categoryOptions}
        className="w-full text-sm"
      />
    </FormField>
    <div className="flex gap-2">
      <AdminButton
        type="submit"
        variant="green"
        disabled={loading}
        className="flex-1 text-sm"
      >
        {loading ? "Saving..." : "Save"}
      </AdminButton>
      <AdminButton
        onClick={onCancel}
        variant="gray"
        disabled={loading}
        className="flex-1 text-sm"
      >
        Cancel
      </AdminButton>
    </div>
  </form>
);
