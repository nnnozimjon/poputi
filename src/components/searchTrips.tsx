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

export const SearchTrips = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [value, setValue] = useState<Date | null>(null);
  const { data, isLoading, isError, error } = useCities();

  const cities = data?.map((city) => {
    return {
      value: String(city.id),
      label: city.name,
    };
  });

  return (
    <motion.div
      initial="offscreen"
      whileInView={"onscreen"}
      viewport={{ once: true, amount: 0.8 }}
      variants={scrollAnimation}
      className="w-full bg-white rounded-lg p-2 shadow-lg"
    >
      <div className="grid grid-cols-12 md:flex gap-4 md:items-center">
        <Select
          placeholder="Откуда"
          className="w-full col-span-12"
          classNames={{
            input: "py-5 border-none",
            section: "text-xl text-main",
          }}
          leftSection={<FaMapLocationDot />}
          data={cities || []}
        />
        <Select
          placeholder="Куда"
          className="w-full col-span-12"
          classNames={{
            input: "py-5 border-none",
            section: "text-xl text-main",
          }}
          data={cities || []}
          leftSection={<MdMyLocation />}
        />
        <DatePickerInput
          placeholder={new Date()?.toLocaleDateString()}
          value={value}
          onChange={setValue}
          leftSection={<BsFillCalendarDateFill />}
          className="w-full col-span-12"
          minDate={new Date()}
          classNames={{
            input: "py-5 border-none",
            section: "text-xl text-main",
          }}
        />
        <Select
          placeholder="Пасажири"
          className="w-full col-span-12"
          classNames={{
            input: "py-5 border-none",
            section: "text-xl text-main",
          }}
          data={["1", "2", "3", "4"]}
          leftSection={<MdMyLocation />}
        />
        <Button
          className="w-full bg-dark-blue hover:bg-dark-blue z-10 col-span-12"
          leftSection={<IoSearch />}
        >
          Поиск
        </Button>
      </div>
    </motion.div>
  );
};
