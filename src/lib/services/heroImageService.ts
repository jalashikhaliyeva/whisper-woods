import { FirebaseStorageService } from "./firebaseStorageService";
import { HeroImage } from "@/types";

export class HeroImageService {
  private static readonly STORAGE_PATH = "hero-images";
  private static readonly DB_PATH = "hero-images";

  static async loadHeroImages(): Promise<HeroImage[]> {
    try {
      const files = await FirebaseStorageService.loadFiles<HeroImage>(
        this.DB_PATH
      );
      return files.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error("Error loading hero images:", error);
      throw new Error(
        "Failed to load images. Please check your Firebase configuration."
      );
    }
  }

  static async uploadImage(
    file: File,
    title: string,
    currentCount: number
  ): Promise<HeroImage> {
    try {
      console.log("Starting upload...", {
        fileName: file.name,
        fileSize: file.size,
      });

      const { downloadURL, fileName } = await FirebaseStorageService.uploadFile(
        file,
        this.STORAGE_PATH
      );

      console.log("Upload successful, got download URL:", downloadURL);

      const newImage: HeroImage = {
        id: FirebaseStorageService.generateId(),
        url: downloadURL,
        fileName,
        fileSize: file.size,
        fileType: file.type,
        title: title.trim(),
        order: currentCount + 1,
        createdAt: new Date().toISOString(),
      };

      console.log("Saving to database...", newImage);

      await FirebaseStorageService.saveFileMetadata(this.DB_PATH, newImage);

      console.log("Database save successful");
      return newImage;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error(
        `Error uploading image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async deleteImage(image: HeroImage): Promise<void> {
    try {
      await FirebaseStorageService.deleteFile(
        image.url,
        this.DB_PATH,
        image.id
      );
    } catch (error) {
      console.error("Error deleting image:", error);
      throw new Error(
        `Error deleting image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async updateImage(image: HeroImage, newTitle: string): Promise<void> {
    try {
      await FirebaseStorageService.updateFileMetadata(this.DB_PATH, image.id, {
        title: newTitle.trim(),
      });
    } catch (error) {
      console.error("Error updating image:", error);
      throw new Error(
        `Error updating image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static validateFile(file: File): { isValid: boolean; error?: string } {
    if (!file.type.startsWith("image/")) {
      return { isValid: false, error: "Please select a valid image file" };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { isValid: false, error: "File size must be less than 5MB" };
    }

    return { isValid: true };
  }
}
