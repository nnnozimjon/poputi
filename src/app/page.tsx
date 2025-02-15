import { ExperienceCounter } from "@/components/experience-counter/experience-couter";
import { Faq } from "@/components/faq/faq";
import { MainPageTopContent } from "@/components/main-page-top-content/main-page-top-content";
import { PopularLocations } from "@/components/popular-locations/popular-locations";
import { SocialMedia } from "@/components/social-media/social-media";
import { Container } from "@mantine/core";

export default function Home() {
  return (
    <div>
      <MainPageTopContent />
      <Container size={"xl"}>
        <PopularLocations />
      </Container>

      <ExperienceCounter />
      
      <div className="bg-white-highlight p-10">
        <p className="text-center text-3xl text-green my-10">
          Часто задаваемые вопросы
        </p>
        <Container size={"xl"} className="mb-20">
          <Faq />
          <SocialMedia />
        </Container>
      </div>
    </div>
  );
}
