"use client";

import { Button, Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import { Logo } from "../logo/logo";
import { redirect } from "@/utils";
import { useAppSelector } from "@/store/store";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices";
import Link from "next/link";
import { useState } from "react";

export const AppHeader = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const [opened, setOpened] = useState(false);

  const logoutUser = () => {
    dispatch(logout());
    setOpened(false);
  };

  return (
    <div className="shadow-md fixed z-50 w-full bg-white">
      <Container>
        <header className="px-2">
          <Group justify="space-between" h="100%">
            <Link href={"/"}>
              <svg
                width={64}
                height={64}
                viewBox="0 0 380 317"
                className="text-main"
              >
                <Logo />
              </svg>
            </Link>

            {!user.isAuthenticated && (
              <>
                <Group visibleFrom="sm">
                  <Button variant="default" onClick={() => redirect("/auth")}>
                    Вход
                  </Button>
                  <Button
                    className="bg-main hover:bg-main"
                    onClick={() => redirect("/register")}
                  >
                    Регистрация
                  </Button>
                </Group>

                <Burger
                  opened={opened}
                  onClick={() => setOpened(!opened)}
                  className="sm:hidden"
                />

                <Drawer
                  opened={opened}
                  onClose={() => setOpened(false)}
                  position="right"
                  size="100%"
                >
                  <Stack p="md">
                    <Button
                      variant="default"
                      className="border-main text-main hover:bg-main hover:text-white"
                      onClick={() => {
                        redirect("/trips");
                        setOpened(false);
                      }}
                    >
                      Найти поездку
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => {
                        redirect("/auth");
                        setOpened(false);
                      }}
                    >
                      Вход
                    </Button>
                    <Button
                      className="bg-main hover:bg-main"
                      onClick={() => {
                        redirect("/register");
                        setOpened(false);
                      }}
                    >
                      Регистрация
                    </Button>
                  </Stack>
                </Drawer>
              </>
            )}

            {user.isAuthenticated && (
              <>
                <Group visibleFrom="sm">
                  <Button
                    rightSection={<CgProfile className="text-dark-blue size-6" />}
                    variant="transparent"
                    className="text-dark-blue"
                    onClick={() => redirect("/profile")}
                  >
                    Профиль
                  </Button>
                  <Button
                    rightSection={<CgLogOut className="text-red-100 size-6" />}
                    variant="transparent"
                    className="text-red-100 hover:text-red-100"
                    onClick={logoutUser}
                  >
                    Выйти
                  </Button>
                </Group>

                <Burger
                  opened={opened}
                  onClick={() => setOpened(!opened)}
                  className="sm:hidden"
                />

                <Drawer
                  opened={opened}
                  onClose={() => setOpened(false)}
                  position="right"
                  size="100%"
                >
                  <Stack p="md">
                    <Button
                      variant="default"
                      className="border-main text-main hover:bg-main hover:text-white"
                      onClick={() => {
                        redirect("/trips");
                        setOpened(false);
                      }}
                    >
                      Найти поездку
                    </Button>
                    <Button
                      rightSection={<CgProfile className="text-dark-blue size-6" />}
                      variant="transparent"
                      className="text-dark-blue"
                      onClick={() => {
                        redirect("/profile");
                        setOpened(false);
                      }}
                    >
                      Профиль
                    </Button>
                    <Button
                      rightSection={<CgLogOut className="text-red-100 size-6" />}
                      variant="transparent"
                      className="text-red-100 hover:text-red-100"
                      onClick={logoutUser}
                    >
                      Выйти
                    </Button>
                  </Stack>
                </Drawer>
              </>
            )}
          </Group>
        </header>
      </Container>
    </div>
  );
};
