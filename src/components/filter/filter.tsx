import { useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { IoMdArrowDown, IoMdArrowUp, IoMdStar } from "react-icons/io";
import { Button, Checkbox, Radio } from "@mantine/core";

interface Option {
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export const Filter = () => {
  const [selectedSort, setSelectedSort] = useState(0);
  const [selectedPickup, setSelectedPickup] = useState<number[]>([]);
  const [selectedTrust, setSelectedTrust] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);

  const sortOptions: Option[] = [
    { label: "Recommended", icon: <IoTimeOutline /> },
    { label: "Price: Low to High", icon: <IoMdArrowUp /> },
    { label: "Price: High to Low", icon: <IoMdArrowDown /> },
    { label: "Rating", icon: <IoMdStar /> },
  ];

  const pickupTimes: Option[] = [
    { label: "Morning (6AM - 12PM)", count: 120 },
    { label: "Afternoon (12PM - 6PM)", count: 85 },
    { label: "Evening (6PM - 12AM)", count: 45 },
    { label: "Night (12AM - 6AM)", count: 20 },
  ];

  const trustSafety: Option[] = [
    { label: "Verified Hosts", count: 250, icon: "✓" },
    { label: "Superhosts", count: 180, icon: "👑" },
    { label: "Instant Book", count: 150, icon: "⚡" },
  ];

  const amenities: Option[] = [
    { label: "Free Cancellation", count: 200, icon: "🔄" },
    { label: "Free WiFi", count: 180, icon: "📶" },
    { label: "Kitchen", count: 150, icon: "🍳" },
    { label: "Washer", count: 120, icon: "🧺" },
  ];

  const clearAll = () => {
    setSelectedSort(0);
    setSelectedPickup([]);
    setSelectedTrust([]);
    setSelectedAmenities([]);
  };

  const toggleSelection = (
    index: number,
    selected: number[],
    setSelected: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    setSelected(
      selected.includes(index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <div
          className="flex justify-between items-center">
          <p className="font-bold text-blue-600 text-2xl">Sort by</p>
          <Button variant="transparent" className="text-[#b0b0b0] text-[16px] p-0 m-0" size="xs" onClick={clearAll}>
            Clear All
          </Button>
        </div>
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
                onChange={() => setSelectedSort(i)}
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
        <p className="font-bold text-blue-600 text-2xl">Pick-up time</p>
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
                  toggleSelection(i, selectedPickup, setSelectedPickup)
                }
                className="mr-2"
              />
              <span style={{ flex: 1 }} className="text-blue-600 text-lg font-medium">{opt.label}</span>
              <span className="text-[#b0b0b0] text-lg">
                {opt.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr
        className="my-4 border-t border-solid border-[#eee]"
      />

      {/* Trust and safety */}
      <div>
        <p className="font-bold text-blue-600 text-2xl">Trust and safety</p>
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
                  toggleSelection(i, selectedTrust, setSelectedTrust)
                }
                className="mr-2"
              />
              <span className="flex-1 text-blue-600 text-lg font-medium">{opt.label}</span>
              <span className="text-[#b0b0b0] text-lg">{opt.count}</span>
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
        <p className="font-bold text-blue-600 text-2xl">Amenities</p>
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
                  toggleSelection(i, selectedAmenities, setSelectedAmenities)
                }
                className="mr-2"
              />
              <span className="flex-1 text-blue-600 text-lg font-medium">{opt.label}</span>
              <span className="text-[#b0b0b0] text-lg">{opt.count}</span>
              <span className="text-[#1ecbff] text-2xl">{opt.icon}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
