"use client";
import { ChangeEvent, ReactNode, useState, useRef, useEffect } from "react";

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
  <div className="space-y-1.5">
    <label
      className={`block text-neutral-600 tracking-wide ${
        small ? "text-xs" : "text-xs uppercase"
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
    className={`w-full px-3 py-2.5 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors ${className}`}
  />
);

// Native Select (for forms)
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
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={onChange}
      className="w-full appearance-none px-3 py-2.5 pr-10 bg-white border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
    >
      {placeholder && (
        <option value="" className="text-neutral-400">
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <svg
        className="w-4 h-4 text-neutral-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);

// Custom Dropdown (smooth animated)
export const Dropdown = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2.5 bg-white border text-sm transition-all duration-200 ${
          isOpen
            ? "border-neutral-400"
            : "border-neutral-200 hover:border-neutral-300"
        }`}
      >
        <span className={value ? "text-neutral-900" : "text-neutral-400"}>
          {displayValue}
        </span>
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute z-50 w-full mt-1 bg-white border border-neutral-200 shadow-lg transition-all duration-200 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
        }`}
      >
        {placeholder && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className={`w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 ${
              !value ? "text-neutral-900 bg-neutral-50" : "text-neutral-400"
            }`}
          >
            {placeholder}
          </button>
        )}
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              onChange(opt.value);
              setIsOpen(false);
            }}
            className={`w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 ${
              value === opt.value
                ? "text-neutral-900 bg-neutral-50"
                : "text-neutral-600"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Button variants
const btnStyles = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800",
  secondary:
    "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50",
  danger:
    "bg-white text-red-600 border border-neutral-200 hover:bg-red-50 hover:border-red-200",
  ghost: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
};

export const AdminButton = ({
  onClick,
  disabled,
  variant = "primary",
  className = "",
  children,
  type = "button",
}: {
  onClick?: () => void;
  disabled?: boolean;
  variant?: keyof typeof btnStyles;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${btnStyles[variant]} ${className}`}
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
  <div className="flex items-center justify-between px-4 py-3 mb-6 bg-red-50 border border-red-100 text-red-700 text-sm">
    <span>{message}</span>
    <button
      onClick={onClose}
      className="ml-4 text-red-400 hover:text-red-600 transition-colors"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

// Loading Spinner
export const LoadingSpinner = ({ text }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-6 h-6 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
    {text && <p className="mt-4 text-sm text-neutral-500">{text}</p>}
  </div>
);

// File Input
export const FileInput = ({
  onChange,
  accept = "image/*",
  className = "",
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  className?: string;
}) => (
  <label className={`block cursor-pointer ${className}`}>
    <span className="flex items-center justify-center w-full px-4 py-3 border border-dashed border-neutral-300 text-neutral-500 text-sm hover:border-neutral-400 hover:text-neutral-600 transition-colors">
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      Choose file
    </span>
    <input type="file" accept={accept} onChange={onChange} className="hidden" />
  </label>
);
