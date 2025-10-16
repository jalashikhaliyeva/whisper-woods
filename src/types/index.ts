import { ReactNode } from "react";

export interface FileValidation {
  maxSize?: number;
  allowedTypes?: string[];
  customValidation?: (file: File) => { isValid: boolean; error?: string };
}

export interface UseFileUploadReturn {
  selectedFile: File | null;
  isUploading: boolean;
  error: string | null;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: (file: File | null) => void;
  setIsUploading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  validateFile: (file: File) => { isValid: boolean; error?: string };
}

export interface FileMetadata {
  id: string;
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  createdAt: string;
  [key: string]: unknown;
}

export interface HeroImage extends FileMetadata {
  title: string;
  order: number;
}

export interface UseHeroImagesReturn {
  images: HeroImage[];
  isLoading: boolean;
  error: string | null;
  isUploading: boolean;
  selectedFile: File | null;
  imageTitle: string;
  editingImage: HeroImage | null;

  loadImages: () => Promise<void>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadImage: () => Promise<void>;
  deleteImage: (image: HeroImage) => Promise<void>;
  updateImage: () => Promise<void>;
  startEditing: (image: HeroImage) => void;
  cancelEditing: () => void;
  setImageTitle: (title: string) => void;
  clearError: () => void;
}

export interface HeroLayoutProps {
  children: ReactNode;
  backgroundImage?: string;
  overlay?: boolean;
  className?: string;
  useFirebaseImage?: boolean;
}

export interface AdminLoginProps {
  onLogin: (username: string, password: string) => void;
}

export interface AdminSidebarProps {
  onLogout: () => void;
}

export interface StandardLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export interface GuestCounterProps {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export interface CalendarPickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  isCheckout?: boolean;
}
