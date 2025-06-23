"use client";

import { Button, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { useCities } from "@/hooks";
import { mapToSelectOptions } from "@/utils";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";

export const SearchTrips = () => {
  const [departureCity, setDepartureCity] = useState<string | null>(null);
  const [destinationCity, setDestinationCity] = useState<string | null>(null);
  const [passengers, setPassengers] = useState<string | null>("1");
  const [departureTime, setDepartureTime] = useState<Date | null>(null);

  const { data: cities } = useCities();
  const mappedCities = mapToSelectOptions(cities || [], "name", "name");

  const handleSearch = () => {
    const params = new URLSearchParams({
      departure_city: String(departureCity),
      destination_city: String(destinationCity),
      departure_time: departureTime ? new Date(departureTime.getTime() + (24 * 60 * 60 * 1000)).toISOString() : "",
      passengers: String(passengers),
    });

    if (!departureCity) params.delete("departure_city");
    if (!destinationCity) params.delete("destination_city");
    if (!departureTime) params.delete("departure_time");
    if (!passengers) params.delete("passengers");

    window.location.href = `/trips?${params.toString()}`;
  };

  return (
    <div className="w-full w-full mx-auto bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4">
        <Select
          placeholder="Откуда"
          leftSection={<FaMapLocationDot />}
          data={mappedCities || []}
          onChange={(value) => setDepartureCity(value)}
          classNames={{
            root: "border-b md:border-b-0 md:border-r border-gray-200 flex items-center",
            input: "border-none focus:ring-0 h-14 md:h-12 text-dark-blue text-base font-bold ml-2",
            option: "text-dark-blue text-base font-bold",
            wrapper: "w-full",
            section: "ml-1 text-main text-xl",
          }}
        />
        <Select
          placeholder="Куда"
          leftSection={<MdMyLocation />}
          data={mappedCities || []}
          onChange={(value) => setDestinationCity(value)}
          classNames={{
            root: "border-b md:border-b-0 md:border-r border-gray-200 flex items-center",
            input: "border-none focus:ring-0 h-14 md:h-12 text-dark-blue text-base font-bold ml-2",
            option: "text-dark-blue text-base font-bold",
            wrapper: "w-full",
            section: "ml-1 text-main text-xl",
          }}
        />
        <DatePickerInput
          placeholder="Сегодня"
          value={departureTime}
          onChange={setDepartureTime}
          leftSection={<BsFillCalendarDateFill />}
          minDate={new Date()}
          classNames={{
            root: "border-b md:border-b-0 md:border-r border-gray-200 flex items-center",
            input: "border-none focus:ring-0 h-14 md:h-12 text-dark-blue text-base font-bold ml-2",
            wrapper: "w-full",
            section: "ml-1 text-main text-xl",
          }}
        />
        <Select
          placeholder="1 пассажир"
          leftSection={<MdMyLocation />}
          data={["1", "2", "3", "4", "5", "6", "7", "8"]}
          value={passengers}
          onChange={(value) => setPassengers(value)}
          classNames={{
            root: "flex items-center",
            input: "border-none focus:ring-0 h-14 md:h-12 text-dark-blue text-base font-bold ml-2",
            option: "text-dark-blue text-base font-bold",
            wrapper: "w-full",
            section: "ml-1 text-main text-xl",
          }}
        />
      </div>

      <Button
        className="w-full md:w-auto bg-main hover:bg-main h-14 md:h-12 rounded-none md:rounded-l-none md:rounded-r-lg text-sm font-semibold px-10"
        onClick={handleSearch}
      >
        Поиск
      </Button>
    </div>
  );
};
