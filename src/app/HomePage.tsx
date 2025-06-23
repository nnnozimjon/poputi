"use client";

import { ClientRegisterContent } from "@/components/client-register/client-register";
import { ExperienceCounter } from "@/components/experience-counter/experience-couter";
import { Faq } from "@/components/faq/faq";
import { MainPageTopContent } from "@/components/main-page-top-content/main-page-top-content";
import { PopularLocations } from "@/components/popular-locations/popular-locations";
import { SocialMedia } from "@/components/social-media/social-media";
import { VehicleTypes } from "@/components/vehicle-types/vehicle-types";
import getScrollAnimation from "@/utils/getScrollAnimation";
import { Container } from "@mantine/core";
import { motion } from "framer-motion";
import { useMemo } from "react";
import SkyImage from "@/assets/carpool-blue-2.svg";
import { SearchTrips } from "@/components/searchTrips";

export default function HomePage() {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full text-center mt-5 md:mt-10">
          <h1 className="text-2xl md:text-5xl text-white font-bold">Поездки на ваш выбор по самым низким ценам</h1>
        </div>
        <img
          src={SkyImage.src}
          alt=""
          className="w-full h-[272px] object-cover object-center hidden md:block"
        />
        <div className="w-full h-[235px] object-cover object-center md:hidden block bg-main" />
        <div className="absolute w-full flex items-center justify-center -bottom-36 md:-bottom-5">
          <Container size={"xl"} className="w-full">
            <SearchTrips />
          </Container>
        </div>
      </div>
      <MainPageTopContent />
      <VehicleTypes />
      <Container size={"xl"} className="mt-4 md:mt-20">
        <PopularLocations />
      </Container>
      <ClientRegisterContent />
      <ExperienceCounter />
      <div className="bg-white-highlight p-10">
        <motion.p
          initial="offscreen"
          whileInView={"onscreen"}
          viewport={{ once: true, amount: 0.8 }}
          variants={scrollAnimation}
          className="text-center text-xl md:text-2xl text-dark-blue font-semibold my-10"
        >
          Часто задаваемые вопросы
        </motion.p>
        <Container size={"xl"} className="mb-20 p-0">
          <Faq />
          <SocialMedia />
        </Container>
      </div>
    </div>
  );
}
