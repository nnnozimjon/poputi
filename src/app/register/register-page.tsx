"use client";
import { FloatingIndicator, Tabs } from "@mantine/core";
import DriverRegisterForm from "./form/driver-register";
import { Logo } from "@/components/logo/logo";
import { useState } from "react";
import Link from "next/link";
import PassengerRegisterForm from "./form/passanger-register";

export const MainRegisterPage = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("Пассажир");
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <div className="py-32 overflow-hidden scrollbar-hide flex items-center justify-center flex-col">
      <svg width={150} height={150} viewBox="0 0 380 317" className="text-main">
        <Logo />
      </svg>
      <div className="flex gap-2 items-center w-full md:w-[400px]">
        <Tabs
          variant="none"
          value={value}
          onChange={setValue}
          className="w-full max-w-3xl mx-auto"
        >
          <Tabs.List
            ref={setRootRef}
            className="relative mb-2 flex items-center bg-[#F3F4F6] p-2 m-2 rounded-md"
          >
            <Tabs.Tab
              value="Пассажир"
              ref={setControlRef("Пассажир")}
              className="text-center text-sm z-10 w-1/2"
            >
              Пассажир
            </Tabs.Tab>
            <Tabs.Tab
              value="Водитель"
              ref={setControlRef("Водитель")}
              className="text-center text-sm z-10 w-1/2"
            >
              Водитель
            </Tabs.Tab>
            <FloatingIndicator
              target={value ? controlsRefs[value] : null}
              parent={rootRef}
              className="bg-white rounded-md border border-solid border-secondary shadow-sm"
            />
          </Tabs.List>
          <Tabs.Panel value="Водитель">
            <DriverRegisterForm />
          </Tabs.Panel>
          <Tabs.Panel value="Пассажир">
            <PassengerRegisterForm />
          </Tabs.Panel>
        </Tabs>
      </div>
      <div className="flex gap-2">
        <p className="text-center select-none">Есть аккаунта? </p>
        <Link
          href={"/auth"}
          className="text-dark-blue cursor-pointer no-underline font-medium"
        >
          Войти
        </Link>
      </div>
    </div>
  );
};
