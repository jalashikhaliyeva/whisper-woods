"use client";

import { useHeroImages } from "@/lib/hooks/useHeroImages";

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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Hero Images Management
        </h1>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-red-700">
                <strong>Error:</strong> {error}
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Upload New Image
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image File (Max 5MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Title
              </label>
              <input
                type="text"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                placeholder="Enter image title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={uploadImage}
              disabled={isUploading || !selectedFile || !imageTitle.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>

        {/* Images Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Current Hero Images ({images.length})
          </h2>

          {images.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hero images uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        console.error("Image failed to load:", image.url);
                        e.currentTarget.src = "/images/placeholder.jpg";
                      }}
                    />
                  </div>

                  <div className="p-4">
                    {editingImage?.id === image.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={imageTitle}
                          onChange={(e) => setImageTitle(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={updateImage}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">
                          {image.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          Order: {image.order}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditing(image)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteImage(image)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
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
    </div>
  );
}
