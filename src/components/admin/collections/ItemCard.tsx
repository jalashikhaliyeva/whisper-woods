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
    <div className="bg-white border border-neutral-200 overflow-hidden group">
      <div className="relative w-full aspect-[4/3]">
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
  <div>
    <h3 className="font-medium text-neutral-900">{item.title}</h3>
    <p className="text-sm text-neutral-500 mt-0.5">{item.location}</p>
    <p className="text-xs text-neutral-400 mt-2">{categoryName}</p>
    <div className="flex gap-2 mt-4 pt-4 border-t border-neutral-100">
      <AdminButton
        onClick={onEdit}
        disabled={loading}
        variant="secondary"
        className="flex-1 text-sm py-2"
      >
        Edit
      </AdminButton>
      <AdminButton
        onClick={onDelete}
        variant="danger"
        disabled={loading}
        className="flex-1 text-sm py-2"
      >
        Delete
      </AdminButton>
    </div>
  </div>
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
  <form onSubmit={onSave} className="space-y-4">
    <div>
      <label className="block text-xs text-neutral-600 uppercase tracking-wide mb-1.5">
        Image
      </label>
      <div className="relative w-full aspect-video mb-2 overflow-hidden border border-neutral-200">
        <Image
          src={edit.preview || item.imageSrc}
          alt="Preview"
          fill
          className="object-cover"
        />
        {edit.preview && (
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-neutral-900 text-white text-xs">
            New
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <label className="flex-1 cursor-pointer">
          <span className="flex items-center justify-center w-full py-2 border border-neutral-200 text-neutral-600 text-sm hover:bg-neutral-50 transition-colors">
            {edit.file ? "Change" : "Replace"}
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
            className="px-3 py-2 border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors text-sm"
          >
            Clear
          </button>
        )}
      </div>
      {edit.file && (
        <p className="text-xs text-neutral-400 mt-1.5 truncate">
          {edit.file.name}
        </p>
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
    <div className="flex gap-2 pt-2">
      <AdminButton
        type="submit"
        disabled={loading}
        className="flex-1 text-sm py-2"
      >
        {loading ? "Saving..." : "Save"}
      </AdminButton>
      <AdminButton
        onClick={onCancel}
        variant="secondary"
        disabled={loading}
        className="flex-1 text-sm py-2"
      >
        Cancel
      </AdminButton>
    </div>
  </form>
);
