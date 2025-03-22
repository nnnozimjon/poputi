"use client";

import { ActionIcon, Container, Group, Text } from "@mantine/core";
import classes from "./FooterLinks.module.css";
import { Logo } from "../logo/logo";

const data = [
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
    title: "Контакты",
    links: [
      { label: "Telegram", link: "https://t.me/" },
      { label: "Whatsapp", link: "https://whatsapp.com/" },
      { label: "Instagram", link: "https://instagram.com/" },
      { label: "Facebook", link: "https://facebook.com" },
    ],
  },
];

export const AppFooter = () => {
  const groups = data.map((group, index) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={`${classes.link} text-white`}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={index}>
        <Text className={`${classes.title} text-white`}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={"py-16 bg-main"}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <svg
            width={128}
            height={128}
            viewBox="0 0 380 317"
            className="text-white"
          >
            <Logo />
          </svg>
          <Text size="md" c="white" className={classes.description}>
            Poputi — это удобный и экономичный способ путешествовать между
            городами, знакомиться с новыми людьми и делать поездки комфортными и
            безопасными.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="white" size="sm">
          © {new Date().getFullYear()} Poputi.tj Все права защищены.
        </Text>
      </Container>
    </footer>
  );
};
