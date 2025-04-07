"use client";

import { Container, Flex, Group, Text } from "@mantine/core";
import { Logo } from "../logo/logo";
import Link from "next/link";

const data = [
  {
    title: "Контакты",
    links: [
      { label: "Telegram", link: "https://t.me/" },
      { label: "Whatsapp", link: "https://whatsapp.com/" },
      { label: "Instagram", link: "https://instagram.com/" },
      { label: "Facebook", link: "https://facebook.com" },
    ],
  },
  {
    title: "Быстрые ссылки",
    links: [
      { label: "Регистрация", link: "/register" },
      { label: "Стать водителем", link: "/profile" },
      { label: "Поездки", link: "/trips" },
      { label: "Наш опыт", link: "#becomeDriver" },
    ],
  },
  {
    title: "Популярные маршруты",
    links: [
      { label: "Душанбе → Куляб", link: "/trips?departure_city=Душанбе&destination_city=Куляб" },
      { label: "Душанбе → Хорог", link: "/trips?departure_city=Душанбе&destination_city=Хорог" },
      { label: "Душанбе → Худжанд", link: "/trips?departure_city=Душанбе&destination_city=Худжанд" },
      { label: "Душанбе → Куляб", link: "/trips?departure_city=Душанбе&destination_city=Куляб" },
    ],
  },

];

export const AppFooter = () => {
  return (
    <div className="bg-main">
      <Container className="pt-20">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <div key={item.title}>
              <Text className="text-white text-lg font-bold mb-2">{item.title}</Text>
              <Group className="flex flex-col gap-2 items-start">
                {item.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.link}
                    className="text-white/80 hover:text-white text-sm mb-2 no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </Group>
            </div>
          ))}
          <div className="sm:hidden">
            <Text className="text-white text-lg font-bold mb-2">Правовая информация</Text>
            <Group className="flex flex-col gap-2 items-start">
              <Link
                href="/privacy"
                className="text-white/80 hover:text-white text-sm mb-2 no-underline transition-colors"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/terms"
                className="text-white/80 hover:text-white text-sm mb-2 no-underline transition-colors"
              >
                Условия использования
              </Link>
              <Link
                href="/cookies"
                className="text-white/80 hover:text-white text-sm mb-2 no-underline transition-colors"
              >
                Настройки файлов cookie
              </Link>
            </Group>
          </div>
        </div>
        <div className="py-10 border-t border-white/10">
          <Flex justify="space-between" align="center" className="flex-col md:flex-row gap-4">
            <Flex visibleFrom="md" gap="md" className="text-white text-sm">
              <Link href="/terms" className="text-white no-underline hover:text-white/80 transition-colors">Условия использования</Link>
              <Link href="/privacy" className="text-white no-underline hover:text-white/80 transition-colors">Политика конфиденциальности</Link>
              <Link href="/cookies" className="text-white no-underline hover:text-white/80 transition-colors">Настройки файлов cookie</Link>
            </Flex>
            <div className="text-white/80 text-sm">
              <svg
                width={64}
                height={64}
                viewBox="0 0 380 317"
                className="text-white"
              >
                <Logo />
              </svg>
            </div>
          </Flex>
        </div>
      </Container>
    </div>
  );
};
