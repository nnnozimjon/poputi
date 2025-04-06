"use client";
import { GrMapLocation } from "react-icons/gr";
import { Text } from "@mantine/core";
import { LocationCard } from "./location-card";
import { motion } from "framer-motion";
import { useMemo } from "react";
import getScrollAnimation from "@/utils/getScrollAnimation";
import boxtar from "@/assets/images/boxtar.webp"
import dushanbe from "@/assets/images/dushanbe.jpg"
import isfara from "@/assets/images/isfara.jpg"
import khujand from "@/assets/images/xujand.webp"
import kulyab from "@/assets/images/kulob.jpg"
import tursunzoda from "@/assets/images/tursunzoda.jpg"
import kaniabadam from "@/assets/images/kanibadam.webp"
import istaravshan from "@/assets/images/istaravsjan.jpg"


const cities = [
  { id: 1, name: "Душанбе", img: dushanbe },
  { id: 2, name: "Худжанд", img: khujand },
  { id: 3, name: "Бохтар", img: boxtar },
  { id: 4, name: "Куляб", img: kulyab },
  { id: 5, name: "Истаравшан", img: istaravshan },
  { id: 6, name: "Турсунзаде", img: tursunzoda },
  { id: 7, name: "Исфара", img: isfara },
  { id: 8, name: "Канибадам", img: kaniabadam },
];

export const PopularLocations = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <motion.div
      initial="offscreen"
      whileInView={"onscreen"}
      viewport={{ once: true, amount: 0.3 }} // Reduced amount to trigger animation earlier on mobile
      variants={scrollAnimation}
      className="overflow-x-hidden" // Prevent horizontal scrolling issues
    >
      <Text className="text-dark-blue text-center text-2xl font-semibold my-5">
        <GrMapLocation /> Популярные направления
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cities.map((city, index) => (
          <LocationCard
            img={city.img.src}
            name={city.name}
            key={city.id}
          />
        ))}
      </div>
    </motion.div>
  );
};
