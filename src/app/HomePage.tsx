"use client";

import { ClientRegisterContent } from "@/components/client-register/client-register";
import { ExperienceCounter } from "@/components/experience-counter/experience-couter";
import { Faq } from "@/components/faq/faq";
import { MainPageTopContent } from "@/components/main-page-top-content/main-page-top-content";
import { PopularLocations } from "@/components/popular-locations/popular-locations";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper/ScrollAnimationWrapper";
import { SocialMedia } from "@/components/social-media/social-media";
import getScrollAnimation from "@/utils/getScrollAnimation";
import { Container } from "@mantine/core";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function HomePage() {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div>
      <MainPageTopContent />
      <Container size={"xl"} className="mt-20">
        <ScrollAnimationWrapper>
          <PopularLocations />
        </ScrollAnimationWrapper>
      </Container>
      <ScrollAnimationWrapper>
        <ClientRegisterContent />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <ExperienceCounter />
      </ScrollAnimationWrapper>

      <div className="bg-white-highlight p-10">
        <ScrollAnimationWrapper>
          <motion.p
            variants={scrollAnimation}
            className="text-center text-xl md:text-2xl text-dark-blue font-semibold my-10"
          >
            Часто задаваемые вопросы
          </motion.p>
        </ScrollAnimationWrapper>
        <Container size={"xl"} className="mb-20 p-0">
          <ScrollAnimationWrapper>
            <Faq />
          </ScrollAnimationWrapper>
            <SocialMedia />
        </Container>
      </div>
    </div>
  );
}
