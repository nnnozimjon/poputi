"use client";
import { GrMapLocation } from "react-icons/gr";
import { Text } from "@mantine/core";
import { LocationCard } from "./location-card";
import { motion } from "framer-motion";
import { useMemo } from "react";
import getScrollAnimation from "@/utils/getScrollAnimation";

const cities = [
  { id: 1, name: "Душанбе", cost: "0" },
  { id: 2, name: "Худжанд", cost: "0" },
  { id: 3, name: "Бохтар", cost: "0" },
  { id: 4, name: "Куляб", cost: "0" },
  { id: 5, name: "Истаравшан", cost: "0" },
  { id: 6, name: "Турсунзаде", cost: "0" },
  { id: 7, name: "Исфара", cost: "0" },
  { id: 8, name: "Канибадам", cost: "0" },
  // {id: 9, name: 'Вахдат', cost: ''},
  // {id: 10, name: 'Пенджикент', cost: ''}
];

export const PopularLocations = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <motion.div
      initial="offscreen"
      whileInView={"onscreen"}
      viewport={{ once: true, amount: 0.8 }}
      variants={scrollAnimation}
    >
      <Text className="text-dark-blue text-center text-2xl font-semibold my-10">
        <GrMapLocation /> Популярные направления
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cities.map((city, index) => (
          <LocationCard
            id={city?.id}
            name={city?.name}
            cost={city?.cost}
            key={index}
          />
        ))}
      </div>
    </motion.div>
  );
};
