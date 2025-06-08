"use client";

import { Button, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useMemo, useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import getScrollAnimation from "@/utils/getScrollAnimation";
import { motion } from "framer-motion";

import { useCities } from "@/hooks";
import { mapToSelectOptions } from "@/utils";
export const SearchTrips = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const [departureCity, setDepartureCity] = useState<string | null>(null);
  const [destinationCity, setDestinationCity] = useState<string | null>(null);
  const [passengers, setPassengers] = useState<string | null>(null);
  const [departureTime, setDepartureTime] = useState<Date | null>(null);

  const { data, isLoading, isError, error } = useCities();

  const cities = mapToSelectOptions(data || [], "name", "name");

  const handleSearch = () => {
    const params = new URLSearchParams({
      departure_city: String(departureCity),
      destination_city: String(destinationCity),
      departure_time: departureTime ? new Date(departureTime.getTime() + (24 * 60 * 60 * 1000)).toISOString() : "",
      passengers: String(passengers)
    });

    if (!departureCity) params.delete('departure_city');
    if (!destinationCity) params.delete('destination_city'); 
    if (!departureTime) params.delete('departure_time');
    if (!passengers) params.delete('passengers');

    window.location.href = `/trips?${params.toString()}`;
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView={"onscreen"}
      viewport={{ once: true, amount: 0.8 }}
      variants={scrollAnimation}
      className="w-full bg-white rounded-xl shadow-lg"
      id="search-trips2"
    >
      <div className="grid grid-cols-12 md:flex gap-4 md:items-center">
        <Select
          placeholder="Откуда"
          className="w-full col-span-12 ml-0 md:ml-2"
          classNames={{
            input: "border-none",
            section: "text-xl text-main",
          }}
          leftSection={<FaMapLocationDot />}
          data={cities || []}
          id="departure-city"
          onChange={(value) => setDepartureCity(value)}
        />
        <Select
          placeholder="Куда"
          className="w-full col-span-12"
          classNames={{
            input: "border-none",
            section: "text-xl text-main",
          }}
          data={cities || []}
          leftSection={<MdMyLocation />}
          onChange={(value) => setDestinationCity(value)}
        />

        <DatePickerInput
          placeholder={new Date()?.toLocaleDateString()}
          value={departureTime}
          onChange={setDepartureTime}
          leftSection={<BsFillCalendarDateFill />}
          className="w-full col-span-12"
          minDate={new Date()}
          classNames={{
            input: "border-none",
            section: "text-xl text-main",
          }}
        />

        <Select
          placeholder="Пасажири"
          className="w-full col-span-12"
          classNames={{
            input: "border-none",
            section: "text-xl text-main",
          }}
          data={["1", "2", "3", "4"]}
          leftSection={<MdMyLocation />}
          onChange={(value) => setPassengers(value)}
        />
        <Button
          className="w-full bg-main hover:bg-blue-dark z-10 col-span-12 h-[56px] rounded-xl"
          leftSection={<IoSearch />}
          onClick={handleSearch}
        >
          Поиск
        </Button>
      </div>
    </motion.div>
  );
};
