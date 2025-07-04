import { useState, useEffect, useCallback } from "react";
import { HeroImageService } from "@/lib/services/heroImageService";
import { HeroImage, UseHeroImagesReturn } from "@/types";

export const useHeroImages = (): UseHeroImagesReturn => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);

  const loadImages = useCallback(async () => {
    try {
      setError(null);
      const loadedImages = await HeroImageService.loadHeroImages();
      setImages(loadedImages);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        setSelectedFile(null);
        return;
      }

      const validation = HeroImageService.validateFile(file);
      if (!validation.isValid) {
        alert(validation.error);
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setError(null);
    },
    []
  );

  const uploadImage = useCallback(async () => {
    if (!selectedFile || !imageTitle.trim()) {
      alert("Please select an image and enter a title");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      await HeroImageService.uploadImage(
        selectedFile,
        imageTitle,
        images.length
      );

      setSelectedFile(null);
      setImageTitle("");

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      await loadImages();
      alert("Image uploaded successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      alert("Error uploading image. Please check the console for details.");
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile, imageTitle, images.length, loadImages]);

  const deleteImage = useCallback(
    async (image: HeroImage) => {
      if (!confirm("Are you sure you want to delete this image?")) return;

      try {
        setError(null);
        await HeroImageService.deleteImage(image);
        await loadImages();
        alert("Image deleted successfully!");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setError(errorMessage);
        alert("Error deleting image. Please try again.");
      }
    },
    [loadImages]
  );

  const updateImage = useCallback(async () => {
    if (!editingImage || !imageTitle.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      setError(null);
      await HeroImageService.updateImage(editingImage, imageTitle);

      setEditingImage(null);
      setImageTitle("");
      await loadImages();
      alert("Image updated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      alert("Error updating image. Please try again.");
    }
  }, [editingImage, imageTitle, loadImages]);

  const startEditing = useCallback((image: HeroImage) => {
    setEditingImage(image);
    setImageTitle(image.title);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingImage(null);
    setImageTitle("");
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  return {
    images,
    isLoading,
    error,
    isUploading,
    selectedFile,
    imageTitle,
    editingImage,
    loadImages,
    handleFileSelect,
    uploadImage,
    deleteImage,
    updateImage,
    startEditing,
    cancelEditing,
    setImageTitle,
    clearError,
  };
};
