"use client";

import { ActionIcon, Container, Group, Text } from "@mantine/core";
import classes from "./FooterLinks.module.css";
import { Logo } from "../logo/logo";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

export const AppFooter = () => {
  const groups = data.map((group) => {
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
      <div className={classes.wrapper} key={group.title}>
        <Text className={`${classes.title} text-white`}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={'py-16 bg-green'}>
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
          <Text size="xs" c="white" className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="white" size="sm">
          © {new Date().getFullYear()} Poputki.tj Все права защищены.
        </Text>
      </Container>
    </footer>
  );
};
