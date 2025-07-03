"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  Calendar,
  MapPin,
  Users,
  CalendarDays,
  Search,
  ChevronDown,
} from "lucide-react";
import { CalendarPicker } from "./CalendarPicker";
import { GuestCounter } from "./GuestCounter";
import { City, Guests } from "./types";

type DropdownType = "destination" | "datePicker" | "guests";
type GuestType = keyof Guests;

const CITIES: readonly City[] = [
  { id: 1, name: "Italy", country: "Italy" },
  { id: 2, name: "Greece", country: "Greece" },
  { id: 3, name: "Portugal", country: "Portugal" },
] as const;

const GUEST_LIMITS = {
  adults: { min: 1, max: 10 },
  children: { min: 0, max: 10 },
  rooms: { min: 1, max: 5 },
} as const;

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(date);
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const useDropdowns = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownType | null>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);
  
  const refs = useMemo(() => ({
    destination: destinationRef,
    datePicker: datePickerRef,
    guests: guestsRef,
  }), []);

  const toggleDropdown = useCallback((type: DropdownType) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  }, []);

  const closeDropdowns = useCallback(() => setOpenDropdown(null), []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (Object.values(refs).every((ref) => !ref.current?.contains(target))) {
        closeDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdowns, refs]);

  return { openDropdown, toggleDropdown, closeDropdowns, refs };
};

export const Hero: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<Guests>({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const { openDropdown, toggleDropdown, closeDropdowns, refs } = useDropdowns();

  const handleDestinationSelect = useCallback(
    (city: City) => {
      setSelectedDestination(`${city.name}, ${city.country}`);
      closeDropdowns();
    },
    [closeDropdowns]
  );

  const handleCheckInSelect = useCallback(
    (date: Date) => {
      setCheckInDate(date);
      if (checkOutDate && checkOutDate <= date) {
        setCheckOutDate(addDays(date, 1));
      }
    },
    [checkOutDate]
  );

  const handleGuestChange = useCallback(
    (type: GuestType, operation: "increment" | "decrement") => {
      setGuests((prev) => {
        const limits = GUEST_LIMITS[type];
        const newValue =
          operation === "increment"
            ? Math.min(prev[type] + 1, limits.max)
            : Math.max(prev[type] - 1, limits.min);

        return { ...prev, [type]: newValue };
      });
    },
    []
  );

  const guestText = useMemo(() => {
    const total = guests.adults + guests.children;
    const roomText = guests.rooms === 1 ? "room" : "rooms";
    return `${total} guest${total !== 1 ? "s" : ""}, ${
      guests.rooms
    } ${roomText}`;
  }, [guests]);

  const minCheckOutDate = useMemo(
    () => (checkInDate ? addDays(checkInDate, 1) : addDays(new Date(), 1)),
    [checkInDate]
  );

  const DropdownButton: React.FC<{
    type: DropdownType;
    icon: React.ReactNode;
    label: string;
    value: string;
    className?: string;
    buttonClassName?: string;
    children: React.ReactNode;
  }> = ({
    type,
    icon,
    label,
    value,
    className = "",
    buttonClassName = "",
    children,
  }) => (
    <div className={`relative flex-1 min-w-0 ${className}`} ref={refs[type]}>
      <button
        onClick={() => toggleDropdown(type)}
        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors group ${buttonClassName}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            {icon}
            <div className="min-w-0">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {label}
              </div>
              <div className="text-sm font-semibold text-gray-900 mt-1 truncate">
                {value}
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
              openDropdown === type ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`absolute top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 transition-all duration-300 ease-in-out transform origin-top ${
          openDropdown === type
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 translate-y-2 pointer-events-none"
        }`}
        style={{ zIndex: 1000 }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-12 max-w-4xl">
        <h1 className="text-xl md:text-3xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-cormorant-garamond)]">
          Your holiday deserves to be
          <span className="inline pl-2 bg-gradient-to-r text-brand antialiased">
            unforgettable
          </span>
        </h1>
        <p className="text-base text-neutral-200 mx-auto leading-relaxed font-[family-name:var(--font-montserrat)]">
          The most beautiful houses to rent, exceptional services and memorable
          experiences
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl">
        <div className="flex flex-col md:flex-row gap-2">
          <DropdownButton
            type="destination"
            icon={<MapPin className="w-5 h-5 text-brand flex-shrink-0" />}
            label="Destination"
            value={selectedDestination || "Where to?"}
            className="border-0 md:border-r border-gray-200"
            buttonClassName="rounded-xl md:rounded-none md:rounded-l-xl"
          >
            <div className="left-0 right-0 max-h-64 overflow-y-auto">
              {CITIES.map((city, index) => (
                <button
                  key={city.id}
                  onClick={() => handleDestinationSelect(city)}
                  className={`w-full p-3 text-left hover:bg-neutral-100 transition-colors border-b border-gray-100 last:border-b-0 ${
                    index === 0 ? "rounded-t-xl" : ""
                  } ${index === CITIES.length - 1 ? "rounded-b-xl" : ""}`}
                >
                  <div className="font-medium text-gray-900">{city.name}</div>
                  <div className="text-sm text-gray-500">{city.country}</div>
                </button>
              ))}
            </div>
          </DropdownButton>

          <div className="relative flex-[2] min-w-0" ref={refs.datePicker}>
            <button
              onClick={() => toggleDropdown("datePicker")}
              className="w-full p-4 text-left border-0 md:border-r border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 min-w-0">
                  <CalendarDays className="w-5 h-5 text-brand flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Check-in
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mt-1 truncate">
                      {checkInDate ? formatDate(checkInDate) : "Add date"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 min-w-0">
                  <Calendar className="w-5 h-5 text-brand flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Check-out
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mt-1 truncate">
                      {checkOutDate ? formatDate(checkOutDate) : "Add date"}
                    </div>
                  </div>
                </div>
              </div>
            </button>

            <div
              className={`absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform origin-top ${
                openDropdown === "datePicker"
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-95 translate-y-2 pointer-events-none"
              }`}
              style={{ zIndex: 1000, minWidth: "600px" }}
            >
              <div className="flex flex-col sm:flex-row overflow-hidden">
                <div className="border-b sm:border-b-0 sm:border-r border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900">Check-in</h4>
                  </div>
                  <CalendarPicker
                    selectedDate={checkInDate}
                    onDateSelect={handleCheckInSelect}
                    minDate={new Date()}
                    maxDate={null}
                  />
                </div>
                <div>
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900">Check-out</h4>
                  </div>
                  <CalendarPicker
                    selectedDate={checkOutDate}
                    onDateSelect={setCheckOutDate}
                    minDate={minCheckOutDate}
                    maxDate={null}
                    isCheckout={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <DropdownButton
            type="guests"
            icon={<Users className="w-5 h-5 text-brand flex-shrink-0" />}
            label="Guests"
            value={guestText}
          >
            <div className="right-0 w-80 p-4 space-y-4">
              {(
                Object.entries(GUEST_LIMITS) as [
                  GuestType,
                  (typeof GUEST_LIMITS)[GuestType]
                ][]
              ).map(([type, limits]) => (
                <GuestCounter
                  key={type}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  count={guests[type]}
                  onIncrement={() => handleGuestChange(type, "increment")}
                  onDecrement={() => handleGuestChange(type, "decrement")}
                  min={limits.min}
                  max={limits.max}
                />
              ))}
            </div>
          </DropdownButton>

          <button className="bg-gradient-to-r cursor-pointer from-brand to-branddark hover:from-branddark hover:to-brand text-white font-semibold py-4 px-6 rounded-xl md:rounded-none md:rounded-r-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl flex-shrink-0">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
