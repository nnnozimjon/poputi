"use client"
import { Button, Container } from "@mantine/core";
import { GiHorizonRoad } from "react-icons/gi";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { RiEmotionHappyFill } from "react-icons/ri";
import { FaCarRear } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BiPlusCircle } from "react-icons/bi";
import { useMemo } from "react";
import getScrollAnimation from "@/utils/getScrollAnimation";
import { motion } from 'framer-motion'

const clientSureInfo = [
  {
    title: "Комфортные поездки",
    text: "Забудьте о пересадках и ожиданиях на остановках. Вас всегда ждет комфортабельный автомобиль.",
    icon: <GiHorizonRoad />,
  },
  {
    title: "Уверенность в безопасности",
    text: "Благодаря нашим рейтинговым системам вы всегда сделаете наилучший выбор для безопасного путешествия.",
    icon: <FaUserShield />,
  },
  {
    title: "Доступные возможности",
    text: "Забронируйте автомобиль по лучшей цене на нужную дату с необходимыми опциями.",
    icon: <FaHandHoldingUsd />,
  },
];

const driverSureInfo = [
  {
    title: "Много вариантов попутчиков",
    text: "В нашей обширной базе пассажиров вы точно найдете тех, кто путешествует в вашем направлении.",
    icon: <FaCarRear />,
  },
  {
    title: "Сэкономить",
    text: "Совместные поездки с попутчиками позволяют не только сократить расходы, но и получить дополнительные преимущества.",
    icon: <FaHandHoldingUsd />,
  },
  {
    title: "Позитивная атмосфера",
    text: "Вас ждут интересные люди, которые сделают вашу поездку незабываемой и увлекательной.",
    icon: <RiEmotionHappyFill />,
  },
];

export const ClientRegisterContent = () => {
 const scrollAnimation = useMemo(() => getScrollAnimation(), []) 
  return (
    <Container size={"xl"} className="mt-10" id="becomeDriver">
      <motion.div variants={scrollAnimation} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-none md:border-1px md:border-solid border-main p-4 rounded-lg">
          <h1 className="text-center text-lg mb-10">Если вы водитель</h1>
          <div className="flex flex-col gap-10">
            {clientSureInfo?.map((info, index) => (
              <div
                key={index}
                className="flex gap-4 items-center justify-center"
              >
                <div className="size-14 bg-main flex items-center justify-center shrink-0 rounded-full text-3xl text-white">
                  {info?.icon}
                </div>
                <div>
                  <h2 className="text-base">{info?.title}</h2>
                  <p className="text-sm">{info?.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            className="bg-dark-blue hover:bg-dark-blue w-full mt-5"
            leftSection={<BiPlusCircle />}
          >
            Предложить поездку
          </Button>
        </div>
        <div className="border border-none md:border-1px md:border-solid border-main p-4 rounded-lg">
          <h1 className="text-center text-lg mb-10">Если вы ищете поездку</h1>
          <div className="flex flex-col gap-10">
            {driverSureInfo?.map((info, index) => (
              <div
                key={index}
                className="flex gap-4 items-center justify-center"
              >
                <div className="size-14 bg-main flex items-center justify-center shrink-0 rounded-full text-3xl text-white">
                  {info?.icon}
                </div>
                <div>
                  <h2 className="text-base">{info?.title}</h2>
                  <p className="text-sm">{info?.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            className="bg-dark-blue hover:bg-dark-blue w-full mt-5"
            leftSection={<IoSearch />}
          >
            Найти поездку
          </Button>
        </div>
      </motion.div>
    </Container>
  );
};
