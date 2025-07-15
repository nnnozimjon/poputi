"use client";

import React, { useMemo } from "react";
import { Container } from "@mantine/core";
import { FaCar } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiHorizonRoad } from "react-icons/gi";
import { RiEmotionHappyFill } from "react-icons/ri";
import getScrollAnimation from "@/utils/getScrollAnimation";
import { motion } from "framer-motion";

export const ExperienceCounter = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const experienceData = [
    {
      id: 1,
      icon: <FaCar />,
      count: "1200000+",
      label: "Постоянные клиенты",
    },
    {
      id: 2,
      icon: <FaMapLocationDot />,
      count: "300000+",
      label: "Встреча попутчиков",
    },
    {
      id: 3,
      icon: <GiHorizonRoad />,
      count: "544000+",
      label: "Завершенные поездки",
    },
    {
      id: 4,
      icon: <RiEmotionHappyFill />,
      count: "1100000+",
      label: "Счастливые клиенты",
    },
  ];
  return (
    <motion.div
      initial="offscreen"
      whileInView={"onscreen"}
      viewport={{ once: true, amount: 0.8 }}
      variants={scrollAnimation}
      className="p-8 my-5 md:my-32"
    >
      <Container>
        <p className="text-center text-xl md:text-2xl text-dark-blue font-semibold mb-8">
          Цифры подтверждающие наш профессионализм
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {experienceData?.map((ex, i) => {
            const styledIcon = React.cloneElement(ex.icon, {
              className: "text-5xl text-main", // Dynamically add class to icon
            });

            return (
              <div key={ex?.id} className="flex items-center flex-col">
                <div className="border-4 border-solid border-main border-t-0 border-r-0 w-fit p-4 rounded-full shrink-0 flex items-center justify-center">
                  {styledIcon}
                </div>
                <p className="text-2xl text-main mt-2 text-center">
                  {ex?.count}
                </p>
                <p className="text-sm text-gray-dark text-center">
                  {ex?.label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </motion.div>
  );
};
