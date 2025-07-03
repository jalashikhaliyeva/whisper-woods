"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const isBefore = (date1: Date, date2: Date): boolean => {
  return date1.getTime() < date2.getTime();
};

const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

interface CalendarPickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  isCheckout?: boolean;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
}) => {
  const today = new Date();
  const currentMonth = selectedDate || today;
  const [displayMonth, setDisplayMonth] = useState<Date>(currentMonth);

  const daysInMonth = new Date(
    displayMonth.getFullYear(),
    displayMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    displayMonth.getFullYear(),
    displayMonth.getMonth(),
    1
  ).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, () => null);

  const isDateDisabled = (day: number): boolean => {
    const date = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );
    const startOfDate = startOfDay(date);
    const startOfMin = minDate ? startOfDay(minDate) : null;
    const startOfMax = maxDate ? startOfDay(maxDate) : null;

    if (startOfMin && isBefore(startOfDate, startOfMin)) return true;
    if (startOfMax && isBefore(startOfMax, startOfDate)) return true;
    return false;
  };

  const isDateSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    const date = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );
    return selectedDate.toDateString() === date.toDateString();
  };

  const handleDateClick = (day: number): void => {
    if (isDateDisabled(day)) return;
    const date = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );
    onDateSelect(date);
  };

  const navigateMonth = (direction: number): void => {
    setDisplayMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  return (
    <div className="w-full max-w-sm md:w-72 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronDown className="w-4 h-4 rotate-90" />
        </button>
        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
          {displayMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="p-1 md:p-2 text-xs font-medium text-gray-500 text-center"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="p-1 md:p-2"></div>
        ))}
        {daysArray.map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            disabled={isDateDisabled(day)}
            className={`
              p-1 md:p-2 text-sm rounded-lg transition-all duration-200 hover:bg-blue-50 min-h-[32px] md:min-h-[36px] flex items-center justify-center
              ${
                isDateSelected(day)
                  ? "bg-brand text-white hover:bg-branddark"
                  : "hover:bg-gray-100"
              }
              ${
                isDateDisabled(day)
                  ? "text-gray-300 cursor-not-allowed hover:bg-transparent"
                  : "text-gray-900 cursor-pointer"
              }
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};