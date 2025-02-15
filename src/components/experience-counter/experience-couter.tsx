'use client';

import React from "react";
import { Container } from "@mantine/core";
import { FaCar } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiHorizonRoad } from "react-icons/gi";
import { RiEmotionHappyFill } from "react-icons/ri";

export const ExperienceCounter = () => {
  const experienceData = [
    {
      id: 1,
      icon: <FaCar />,
      count: "1200+",
      label: "Постоянные клиенты",
    },
    {
      id: 2,
      icon: <FaMapLocationDot />,
      count: "300+",
      label: "Встреча попутчиков",
    },
    {
      id: 3,
      icon: <GiHorizonRoad />,
      count: "544+",
      label: "Завершенные поездки",
    },
    {
      id: 4,
      icon: <RiEmotionHappyFill />,
      count: "248+",
      label: "Счастливые клиенты",
    },
  ];
  return (
    <div className="p-8 my-32">
      <Container>
        <p className="text-center text-2xl text-green font-medium mb-8">
          Цифры подтверждающие наш профессионализм
        </p>
        <div className="flex items-center justify-between">
          {experienceData?.map((ex, i) => {
            const styledIcon = React.cloneElement(ex.icon, {
              className: "text-5xl text-green", // Dynamically add class to icon
            });

            return (
              <div key={ex?.id} className="flex items-center flex-col">
                <div className="border-4 border-solid border-green border-t-0 border-r-0 w-fit p-4 rounded-full shrink-0 flex items-center justify-center">
                  {styledIcon}
                </div>
                <p className="text-2xl text-green mt-2 text-center">{ex?.count}</p>
                <p className="text-sm text-gray-dark text-center">{ex?.label}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
