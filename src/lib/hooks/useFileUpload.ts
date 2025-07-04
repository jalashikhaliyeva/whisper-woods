import { FileValidation, UseFileUploadReturn } from "@/types";
import { useState, useCallback } from "react";

export const useFileUpload = (
  validation?: FileValidation
): UseFileUploadReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File): { isValid: boolean; error?: string } => {
      // Check file type
      if (
        validation?.allowedTypes &&
        !validation.allowedTypes.some((type) => file.type.startsWith(type))
      ) {
        return {
          isValid: false,
          error: `File type not allowed. Allowed types: ${validation.allowedTypes.join(
            ", "
          )}`,
        };
      }

      // Check file size
      if (validation?.maxSize && file.size > validation.maxSize) {
        const maxSizeMB = validation.maxSize / (1024 * 1024);
        return {
          isValid: false,
          error: `File size must be less than ${maxSizeMB}MB`,
        };
      }

      // Custom validation
      if (validation?.customValidation) {
        return validation.customValidation(file);
      }

      return { isValid: true };
    },
    [validation]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        setSelectedFile(null);
        return;
      }

      const validationResult = validateFile(file);
      if (!validationResult.isValid) {
        setError(validationResult.error || "Invalid file");
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setError(null);
    },
    [validateFile]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    selectedFile,
    isUploading,
    error,
    handleFileSelect,
    setSelectedFile,
    setIsUploading,
    setError,
    clearError,
    validateFile,
  };
};
