"use client";

import { Button, Container, Group } from "@mantine/core";
import { Logo } from "../logo/logo";
import { redirect } from "@/utils";
import { useAppSelector } from "@/store/store";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices";
import Link from "next/link";

export const AppHeader = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  const logoutUser = () => {
    dispatch(logout());
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

            {user.isAuthenticated && (
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
            )}
          </Group>
        </header>
      </Container>
    </div>
  );
};
