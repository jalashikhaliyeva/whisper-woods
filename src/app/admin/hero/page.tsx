"use client";

import { useHeroImages } from "@/lib/hooks/useHeroImages";
import Image from "next/image";
import {
  FormField,
  Input,
  AdminButton,
  FileInput,
  LoadingSpinner,
  ErrorAlert,
} from "@/components/ui/form-controls";

export default function HeroImagesPage() {
  const {
    images,
    isLoading,
    error,
    isUploading,
    selectedFile,
    imageTitle,
    editingImage,
    handleFileSelect,
    uploadImage,
    deleteImage,
    updateImage,
    startEditing,
    cancelEditing,
    setImageTitle,
  } = useHeroImages();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
          Hero Images
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Manage homepage hero section images
        </p>
      </div>

      {error && (
        <ErrorAlert message={error} onClose={() => window.location.reload()} />
      )}

      {/* Upload Section */}
      <div className="p-6 bg-white border border-neutral-200 mb-8">
        <h2 className="font-medium text-neutral-900 mb-6">Upload New Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Image File">
            <FileInput onChange={handleFileSelect} />
            {selectedFile && (
              <p className="mt-2 text-xs text-neutral-500">
                {selectedFile.name} (
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </FormField>
          <FormField label="Image Title">
            <Input
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              placeholder="Enter image title"
            />
          </FormField>
        </div>
        <div className="mt-6">
          <AdminButton
            onClick={uploadImage}
            disabled={isUploading || !selectedFile || !imageTitle.trim()}
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </AdminButton>
        </div>
      </div>

      {/* Images Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-neutral-900">
            Current Images
            <span className="ml-2 text-neutral-400 font-normal">
              ({images.length})
            </span>
          </h2>
        </div>

        {images.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 text-sm border border-dashed border-neutral-200">
            No hero images uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white border border-neutral-200 overflow-hidden"
              >
                <div className="relative aspect-video">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.jpg";
                    }}
                  />
                </div>

                <div className="p-4">
                  {editingImage?.id === image.id ? (
                    <div className="space-y-3">
                      <Input
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <AdminButton
                          onClick={updateImage}
                          className="flex-1 text-sm py-2"
                        >
                          Save
                        </AdminButton>
                        <AdminButton
                          onClick={cancelEditing}
                          variant="secondary"
                          className="flex-1 text-sm py-2"
                        >
                          Cancel
                        </AdminButton>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-medium text-neutral-900">
                        {image.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        Order: {image.order}
                      </p>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-neutral-100">
                        <AdminButton
                          onClick={() => startEditing(image)}
                          variant="secondary"
                          className="flex-1 text-sm py-2"
                        >
                          Edit
                        </AdminButton>
                        <AdminButton
                          onClick={() => deleteImage(image)}
                          variant="danger"
                          className="flex-1 text-sm py-2"
                        >
                          Delete
                        </AdminButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
