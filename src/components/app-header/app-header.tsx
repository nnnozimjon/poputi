"use client";

import {
  Button,
  Container,
  Group,
  Burger,
  Drawer,
  Stack,
  Divider,
} from "@mantine/core";
import { Logo } from "../logo/logo";
import { redirect } from "@/utils";
import { useAppSelector } from "@/store/store";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices";
import Link from "next/link";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

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
      <Container size={"xl"}>
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

            {!user?.isAuthenticated && (
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
            )}

            {user?.isAuthenticated && (
              <Group visibleFrom="sm">
                <Button
                  variant="transparent"
                  className="text-dark-blue"
                  onClick={() => {
                    redirect("/my-trips");
                  }}
                >
                  Мои поездки
                </Button>
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
            )}

            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              className="sm:hidden"
            />

            <Drawer
              opened={opened}
              onClose={() => setOpened(false)}
              position="left"
              size="90%"
              title="Poputi TJ"
              classNames={{
                title: "text-blue-600 text-[24px] font-bold"
              }}
            >
              <Stack>
                {!user?.isAuthenticated && (
                  <>
                    <Button
                      fullWidth
                      variant="transparent"
                      className="text-blue-600 text-[16px] p-0"
                      justify="space-between"
                      rightSection={<FaAngleRight />}
                      onClick={() => {
                        redirect("/auth");
                        setOpened(false);
                      }}
                    >
                      Вход
                    </Button>
                    <Button
                      fullWidth
                      variant="transparent"
                      className="text-blue-600 text-[16px] p-0"
                      justify="space-between"
                      rightSection={<FaAngleRight />}
                      onClick={() => {
                        redirect("/register");
                        setOpened(false);
                      }}
                    >
                      Регистрация
                    </Button>
                  </>
                )}
                {user?.isAuthenticated && (
                  <>
                    <Button
                      fullWidth
                      justify="space-between"
                      rightSection={<FaAngleRight />}
                      variant="transparent"
                      className="text-blue-600 text-[16px] p-0"
                      onClick={() => {
                        redirect("/my-trips");
                        setOpened(false);
                      }}
                    >
                      Мои поездки
                    </Button>
                    <Button
                      fullWidth
                      justify="space-between"
                      rightSection={<FaAngleRight />}
                      variant="transparent"
                      className="text-blue-600 text-[16px] p-0"
                      onClick={() => {
                        redirect("/profile");
                        setOpened(false);
                      }}
                    >
                      Профиль
                    </Button>
                    <Button
                      fullWidth
                      justify="space-between"
                      rightSection={
                        <CgLogOut className="text-red-100 size-6" />
                      }
                      variant="transparent"
                      className="text-red-100 text-[16px] p-0"
                      onClick={logoutUser}
                    >
                      Выйти
                    </Button>
                  </>
                )}
                <Divider />
                <p className="text-[22px] text-blue-600 font-bold">
                  Путешествие по...
                </p>
                <Button
                  fullWidth
                  variant="transparent"
                  className="text-blue-600 text-[16px] p-0"
                  justify="space-between"
                  rightSection={<FaAngleRight />}
                  onClick={() => {
                    redirect("/trips?type=bus");
                    setOpened(false);
                  }}
                >
                  Автобус
                </Button>
                <Button
                  fullWidth
                  variant="transparent"
                  className="text-blue-600 text-[16px] p-0"
                  justify="space-between"
                  rightSection={<FaAngleRight />}
                  onClick={() => {
                    redirect("/trips?type=car");
                    setOpened(false);
                  }}
                >
                  Автомобиль
                </Button>
              </Stack>
            </Drawer>
          </Group>
        </header>
      </Container>
    </div>
  );
};
