"use client";
import { ChangeEvent, ReactNode } from "react";

// Form Field wrapper
export const FormField = ({
  label,
  children,
  small,
}: {
  label: string;
  children: ReactNode;
  small?: boolean;
}) => (
  <div>
    <label
      className={`block font-medium mb-${small ? "1" : "2"} ${
        small ? "text-xs" : "text-sm"
      }`}
    >
      {label}
    </label>
    {children}
  </div>
);

// Text Input
export const Input = ({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
  />
);

// Select dropdown
type SelectOption = { value: string; label: string };
export const Select = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}) => (
  <select
    value={value}
    onChange={onChange}
    className={`p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

// Admin Button with color variants
const btnColors = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  red: "bg-red-500 hover:bg-red-600",
  gray: "bg-gray-500 hover:bg-gray-600",
};

export const AdminButton = ({
  onClick,
  disabled,
  variant = "blue",
  className = "",
  children,
  type = "button",
}: {
  onClick?: () => void;
  disabled?: boolean;
  variant?: keyof typeof btnColors;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed ${btnColors[variant]} ${className}`}
  >
    {children}
  </button>
);

// Error Alert
export const ErrorAlert = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    {message}
    <button onClick={onClose} className="float-right font-bold">
      ×
    </button>
  </div>
);

// Loading Spinner
export const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="text-center py-8">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
    <p className="mt-2 text-gray-600">{text}</p>
  </div>
);
