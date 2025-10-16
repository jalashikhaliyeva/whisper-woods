import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { ref as dbRef, set, get, remove } from "firebase/database";
import { storage, database } from "@/lib/firebase";
import { FileMetadata } from "@/types";



export class FirebaseStorageService {
  private static readonly STORAGE_PATH = "uploads";

  // Upload file to Firebase Storage
  static async uploadFile(
    file: File,
    path: string
  ): Promise<{ downloadURL: string; fileName: string }> {
    try {
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop();
      const fileName = `${path}-${timestamp}.${fileExtension}`;
      const storagePath = `${this.STORAGE_PATH}/${path}/${fileName}`;

      const storageReference = ref(storage, storagePath);
      const snapshot = await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      return { downloadURL, fileName };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error(
        `Error uploading file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Save file metadata to Realtime Database
  static async saveFileMetadata(
    dbPath: string,
    metadata: FileMetadata
  ): Promise<void> {
    try {
      const dbReference = dbRef(database, `${dbPath}/${metadata.id}`);
      await set(dbReference, metadata);
    } catch (error) {
      console.error("Error saving file metadata:", error);
      throw new Error(
        `Error saving file metadata: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Load files from Realtime Database
  static async loadFiles<T extends FileMetadata>(
    dbPath: string
  ): Promise<T[]> {
    try {
      const dbReference = dbRef(database, dbPath);
      const snapshot = await get(dbReference);

      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      return [];
    } catch (error) {
      console.error("Error loading files:", error);
      throw new Error(
        `Error loading files: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Delete file from both Storage and Database
  static async deleteFile(
    fileUrl: string,
    dbPath: string,
    fileId: string
  ): Promise<void> {
    try {
      // Extract file path from URL
      const url = new URL(fileUrl);
      const filePath = decodeURIComponent(
        url.pathname.split("/o/")[1].split("?")[0]
      );

      // Delete from Storage
      const storageReference = ref(storage, filePath);
      await deleteObject(storageReference);

      // Delete from Database
      const dbReference = dbRef(database, `${dbPath}/${fileId}`);
      await remove(dbReference);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw new Error(
        `Error deleting file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Update file metadata in Database
  static async updateFileMetadata(
    dbPath: string,
    fileId: string,
    updates: Partial<FileMetadata>
  ): Promise<void> {
    try {
      const dbReference = dbRef(database, `${dbPath}/${fileId}`);
      await set(dbReference, updates);
    } catch (error) {
      console.error("Error updating file metadata:", error);
      throw new Error(
        `Error updating file metadata: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // List all files in a storage directory
  static async listFiles(storagePath: string): Promise<string[]> {
    try {
      const listRef = ref(storage, storagePath);
      const res = await listAll(listRef);
      return res.items.map((itemRef) => itemRef.fullPath);
    } catch (error) {
      console.error("Error listing files:", error);
      throw new Error(
        `Error listing files: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Create unique ID
  static generateId(): string {
    return Date.now().toString();
  }

  // Format file size
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
} 