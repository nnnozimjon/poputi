import { useState, useEffect } from "react";
import { IoMoon, IoSunny, IoTimeOutline } from "react-icons/io5";
import { IoMdArrowDown, IoMdArrowUp, IoMdStar } from "react-icons/io";
import { Button, Checkbox, Radio, Badge } from "@mantine/core";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface Option {
  label: string;
  count?: number;
  icon?: React.ReactNode;
  value?: string;
}

export const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortOptions: Option[] = [
    { label: "Рекомендованные", icon: "⏰", value: "all" },
    { label: "Цена: по возрастанию", icon: "⬆️", value: "highest" },
    { label: "Цена: по убыванию", icon: "⬇️", value: "lowest" },
    { label: "Рейтинг", icon: "⭐", value: "all" },
  ];

  const pickupTimes: Option[] = [
    { label: "Утро (6AM - 12PM)", count: 120, icon: "🌅", value: "morning" },
    { label: "День (12PM - 6PM)", count: 85, icon: "☀️", value: "afternoon" },
    { label: "Вечер (6PM - 12AM)", count: 45, icon: "🌇", value: "evening" },
    { label: "Ночь (12AM - 6AM)", count: 20, icon: "🌙", value: "night" },
  ];

  const trustSafety: Option[] = [
    { label: "Подтвержденные хосты", count: 250, icon: "✓", value: "verified" },
    { label: "Суперхосты", count: 180, icon: "👑", value: "superhost" },
    { label: "Мгновенная бронь", count: 150, icon: "⚡", value: "instant" },
  ];

  const amenities: Option[] = [
    { label: "Бесплатная отмена", count: 200, icon: "🔄", value: "free_cancellation" },
    { label: "Бесплатный WiFi", count: 180, icon: "📶", value: "wifi" },
    { label: "Кухня", count: 150, icon: "🍳", value: "kitchen" },
    { label: "Стиральная машина", count: 120, icon: "🧺", value: "laundry" },
  ];

  // Get current filter values from URL
  const currentSort = searchParams.get("price_sort") || "all";
  const currentPickup = searchParams.get("pickup_time_range")?.split(",") || [];
  const currentTrust = searchParams.get("trust_safety")?.split(",") || [];
  const currentAmenities = searchParams.get("amenities")?.split(",") || [];

  // Find the index of current sort option
  const getSortIndex = (value: string) => {
    const index = sortOptions.findIndex(option => option.value === value);
    return index >= 0 ? index : 0;
  };

  // Find indices of selected options
  const getSelectedIndices = (values: string[], options: Option[]) => {
    return values.map(value => options.findIndex(option => option.value === value)).filter(index => index >= 0);
  };

  const [selectedSort, setSelectedSort] = useState(getSortIndex(currentSort));
  const [selectedPickup, setSelectedPickup] = useState<number[]>(getSelectedIndices(currentPickup, pickupTimes));
  const [selectedTrust, setSelectedTrust] = useState<number[]>(getSelectedIndices(currentTrust, trustSafety));
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>(getSelectedIndices(currentAmenities, amenities));

  // Check if any filters are active
  const hasActiveFilters = selectedSort !== 0 || selectedPickup.length > 0 || selectedTrust.length > 0 || selectedAmenities.length > 0;

  // Update local state when URL changes
  useEffect(() => {
    const newSort = searchParams.get("price_sort") || "all";
    const newPickup = searchParams.get("pickup_time_range")?.split(",") || [];
    const newTrust = searchParams.get("trust_safety")?.split(",") || [];
    const newAmenities = searchParams.get("amenities")?.split(",") || [];

    setSelectedSort(getSortIndex(newSort));
    setSelectedPickup(getSelectedIndices(newPickup, pickupTimes));
    setSelectedTrust(getSelectedIndices(newTrust, trustSafety));
    setSelectedAmenities(getSelectedIndices(newAmenities, amenities));
  }, [searchParams]);

  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    setSelectedSort(0);
    setSelectedPickup([]);
    setSelectedTrust([]);
    setSelectedAmenities([]);
    
    updateURL({
      price_sort: null,
      pickup_time_range: null,
      trust_safety: null,
      amenities: null,
    });
  };

  const handleSortChange = (index: number) => {
    setSelectedSort(index);
    const value = sortOptions[index]?.value || "0";
    updateURL({ price_sort: value });
  };

  const toggleSelection = (
    index: number,
    selected: number[],
    setSelected: React.Dispatch<React.SetStateAction<number[]>>,
    options: Option[],
    paramName: string
  ) => {
    const newSelected = selected.includes(index)
      ? selected.filter((i) => i !== index)
      : [...selected, index];
    
    setSelected(newSelected);
    
    const values = newSelected.map(i => options[i]?.value).filter(Boolean);
    updateURL({ [paramName]: values.length > 0 ? values.join(",") : null });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <div
          className="flex justify-between items-center">
          <p className="font-bold text-blue-600 text-2xl">Сортировка</p>
          {hasActiveFilters && (
            <Button 
              variant="transparent" 
              className="text-[#b0b0b0] text-[16px] p-0 m-0" 
              size="xs" 
              onClick={clearAll}
            >
              Очистить все
            </Button>
          )}
        </div>
        {hasActiveFilters && (
          <div className="mt-2 mb-4">
            <Badge color="blue" variant="light" size="sm">
              Активные фильтры: {[
                selectedSort !== 0 && "Сортировка",
                selectedPickup.length > 0 && "Время выезда",
                selectedTrust.length > 0 && "Надежность",
                selectedAmenities.length > 0 && "Удобства"
              ].filter(Boolean).join(", ")}
            </Badge>
          </div>
        )}
        <div style={{ marginTop: 12 }}>
          {sortOptions.map((opt: Option, i: number) => (
            <label
              key={opt.label}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                cursor: "pointer",
              }}
            >
              <Radio
                name="sort"
                checked={selectedSort === i}
                onChange={() => handleSortChange(i)}
                className="mr-2"
              />
              <span className="text-blue-600 flex-1 text-lg font-medium">{opt.label}</span>
              <span className="text-[#b0b0b0] text-2xl">{opt.icon}</span>
            </label>
          ))}
        </div>
      </div>

      <hr
        className="my-4 border-t border-solid border-[#eee]"
      />

      {/* Pick-up time */}
      <div>
        <p className="font-bold text-blue-600 text-2xl">Время выезда</p>
        <div className="mt-4">
          {pickupTimes.map((opt: Option, i: number) => (
            <label
              key={opt.label}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                cursor: "pointer",
              }}
            >
              <Checkbox
                checked={selectedPickup.includes(i)}
                onChange={() =>
                  toggleSelection(i, selectedPickup, setSelectedPickup, pickupTimes, "pickup_time_range")
                }
                className="mr-2"
              />
              <span style={{ flex: 1 }} className="text-blue-600 text-lg font-medium">{opt.label}</span>
              <span className="text-[#1ecbff] text-2xl">{opt.icon}</span>
              {/* <span className="text-[#b0b0b0] text-lg">
                {opt.count}
              </span> */}
            </label>
          ))}
        </div>
      </div>

      <hr
        className="my-4 border-t border-solid border-[#eee]"
      />

      {/* Trust and safety */}
      <div>
        <p className="font-bold text-blue-600 text-2xl">Надежность и безопасность</p>
        <div className="mt-4">
          {trustSafety.map((opt: Option, i: number) => (
            <label
              key={opt.label}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                cursor: "pointer",
              }}
            >
              <Checkbox
                checked={selectedTrust.includes(i)}
                onChange={() =>
                  toggleSelection(i, selectedTrust, setSelectedTrust, trustSafety, "trust_safety")
                }
                className="mr-2"
              />
              <span className="flex-1 text-blue-600 text-lg font-medium">{opt.label}</span>
              {/* <span className="text-[#b0b0b0] text-lg"`>{opt.count}</span> */}
              <span className="text-[#1ecbff] text-2xl">{opt.icon}</span>
            </label>
          ))}
        </div>
      </div>

      <hr
        className="my-4 border-t border-solid border-[#eee]"
      />

      {/* Amenities */}
      <div>
        <p className="font-bold text-blue-600 text-2xl">Удобства</p>
        <div className="mt-4">
          {amenities.map((opt: Option, i: number) => (
            <label
              key={opt.label}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                cursor: "pointer",
              }}
            >

              <Checkbox
                checked={selectedAmenities.includes(i)}
                onChange={() =>
                  toggleSelection(i, selectedAmenities, setSelectedAmenities, amenities, "amenities")
                }
                className="mr-2"
              />
              <span className="flex-1 text-blue-600 text-lg font-medium">{opt.label}</span>
              {/* <span className="text-[#b0b0b0] text-lg">{opt.count}</span> */}
              <span className="text-[#1ecbff] text-2xl">{opt.icon}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
