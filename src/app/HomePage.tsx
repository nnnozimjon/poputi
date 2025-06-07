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
        <img
          src={SkyImage.src}
          alt=""
          className="w-full h-[272px] object-cover object-center"
        />
        <div className="absolute w-full flex items-center justify-center -bottom-5">
          <div className="w-full md:w-auto px-4 md:p-0">
          <SearchTrips /> 
          </div>
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
