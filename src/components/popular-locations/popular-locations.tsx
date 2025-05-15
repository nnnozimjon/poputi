"use client";
import { GrMapLocation } from "react-icons/gr";
import { Text } from "@mantine/core";
import { LocationCard } from "./location-card";
import boxtar from "@/assets/images/boxtar.webp";
import dushanbe from "@/assets/images/dushanbe.jpg";
import isfara from "@/assets/images/isfara.jpg";
import khujand from "@/assets/images/xujand.webp";
import kulyab from "@/assets/images/kulob.jpg";
import tursunzoda from "@/assets/images/tursunzoda.jpg";
import kaniabadam from "@/assets/images/kanibadam.webp";
import istaravshan from "@/assets/images/istaravsjan.jpg";
import { Carousel } from "@mantine/carousel";

const cities = [
  { id: 1, name: "Душанбе", img: dushanbe },
  { id: 4, name: "Куляб", img: kulyab },
  { id: 2, name: "Худжанд", img: khujand },
  { id: 3, name: "Бохтар", img: boxtar },
  { id: 5, name: "Истаравшан", img: istaravshan },
  { id: 6, name: "Турсунзаде", img: tursunzoda },
  { id: 7, name: "Исфара", img: isfara },
  { id: 8, name: "Канибадам", img: kaniabadam },
];

export const PopularLocations = () => {
  return (
    <div>
      <Text className="text-dark-blue text-center text-2xl font-semibold mb-4">
        <GrMapLocation /> Популярные направления
      </Text>
      <Carousel
        type="container"
        withIndicators
        height={230}
        slideSize={'33%'}
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
      >
        {cities.map((city) => (
          <Carousel.Slide key={city?.id}>
            <LocationCard key={city?.id} name={city.name} img={city.img.src} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};
