"use client";

import getScrollAnimation from "@/utils/getScrollAnimation";
import { Button, Container, Flex } from "@mantine/core";
import { useMemo } from "react";
import { BsInstagram, BsTelegram, BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "../ScrollAnimationWrapper/ScrollAnimationWrapper";

export const SocialMedia = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <div className="mt-20 rounded-lg bg-white p-4 md:p-16">
      <Container>
        <Flex justify={"center"}>
          <ScrollAnimationWrapper>
            <motion.h1
              variants={scrollAnimation}
              className="text-center text-dark-blue text-xl md:text-2xl mb-4 flex-wrap font-semibold w-96"
            >
              Вы можете помочь сделать наш сервис еще популярнее.
            </motion.h1>
          </ScrollAnimationWrapper>
        </Flex>

        <ScrollAnimationWrapper>
          <motion.p
            variants={scrollAnimation}
            className="text-center text-sm md:text-xl"
          >
            Поделитесь ссылкой на наше приложение со своими друзьями и помогите
            нам увеличить количество пассажиров и водителей. Ваша помощь сделает
            нашу платформу более популярной.
          </motion.p>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <motion.div
            variants={scrollAnimation}
            className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-5"
          >
            <Button
              variant="default"
              leftSection={<BsInstagram className="text-lg md:text-2xl" />}
              className="text-main hover:text-main"
            >
              Instagram
            </Button>
            <Button
              variant="default"
              leftSection={<FaFacebook className="text-lg md:text-2xl" />}
              className="text-main hover:text-main"
            >
              Facebook
            </Button>
            <Button
              variant="default"
              leftSection={<BsTelegram className="text-lg md:text-2xl" />}
              className="text-main hover:text-main"
            >
              Telegram
            </Button>
            <Button
              variant="default"
              leftSection={<BsWhatsapp className="text-lg md:text-2xl" />}
              className="text-main hover:text-main"
            >
              Whatsapp
            </Button>
          </motion.div>
        </ScrollAnimationWrapper>
      </Container>
    </div>
  );
};
