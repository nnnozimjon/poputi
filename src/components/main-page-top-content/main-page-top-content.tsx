import { Button, Container, Group, Text } from "@mantine/core";
import { CarLandscapeSvg } from "../carLandscape";
import { TajikistanMapSvg } from "../tajikistanMap";
import { SearchTrips } from "../searchTrips";
import { useState } from "react";
import { AddCarSeats, CreateTripModal } from "@/modals";
import { useAppSelector } from "@/store/store";
import { redirect } from "@/utils";

export const MainPageTopContent = () => {
  const user = useAppSelector((state) => state.user);
  const isCarSeatsAdded = user.isCarSeatsAdded;
  const isDriver = user.isDriver;

  const [isOpenCarSeatsModal, setIsOpenCarSeatsModal] =
    useState<boolean>(false);
  const [isOpenCreateTripModal, setIsOpenCreateTripModal] =
    useState<boolean>(false);

  const handleOpenRequiredModal = () => {
    if (!user.isAuthenticated) {
      return redirect("/auth");
    }

    if (!isDriver) {
      return redirect("/profile");
    }

    if (isCarSeatsAdded) {
      return setIsOpenCreateTripModal(true);
    }

    return setIsOpenCarSeatsModal(true);
  };

  return (
    <div className="bg-secondary-100 w-full">
      <Container
        size={"xl"}
        className="py-10 sm:py-14 grid grid-cols-12 gap-6 sm:gap-10 w-full"
      >
        {/* Left Content */}
        <div className="md:col-span-6 col-span-12 md:order-1 order-2 flex flex-col gap-6 sm:gap-10 items-center justify-center">
          <Text className="text-center sm:text-left font-semibold text-3xl md:text-6xl text-dark-blue mt-0 md:mt-20">
            Сервис для 
            <strong className="text-main">поиска попутчиков</strong>
             и автомобилей для поездок по 
            <strong className="text-main">Таджикистан</strong>
          </Text>
          <Text className="text-secondary-200 text-center sm:text-left">
            Найдите надежного водителя или поделите расходы на поездку с
            попутчиками. Водители могут добавлять свои автомобили, создавать
            маршруты и устанавливать цены на места в зависимости от комфорта и
            расположения в салоне.
          </Text>

          {/* Buttons */}
          <Group
            visibleFrom="md"
            className="w-full flex flex-col md:flex-row gap-3 sm:gap-5 items-center sm:items-end"
          >
            <Button 
              className="w-full sm:w-auto bg-dark-blue hover:bg-dark-blue h-14"
              onClick={() => {
                const departureCity = document.getElementById('departure-city');
                departureCity?.click();
                const element = document.getElementById('search-trips2');
                const headerOffset = 160;
                const elementPosition = element?.getBoundingClientRect().top;
                const offsetPosition = elementPosition ? elementPosition + window.pageYOffset - headerOffset : 0;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }}
            >
              Найти поездку
            </Button>

            <Button
              onClick={handleOpenRequiredModal}
              className="w-full sm:w-auto bg-dark-blue hover:bg-dark-blue h-14"
              id="create-trip"
            >
              Предложить поездку
            </Button>
          </Group>
        </div>

        {/* Right Content (SVGs) */}
        <div className="md:col-span-6 md:order-2 order-3 md:order-1 col-span-12 flex flex-col gap-4 items-center md:items-start">
          <svg className="w-full h-full" viewBox="0 0 553 399">
            <TajikistanMapSvg />
          </svg>
          <svg className="w-full h-full" viewBox="0 0 553 201">
            <CarLandscapeSvg />
          </svg>
        </div>

        {/* Search Trips */}
        <div className="order-1 md:order-3 col-span-12 w-full">
          <SearchTrips />
        </div>
      </Container>

      <AddCarSeats
        opened={isOpenCarSeatsModal}
        close={() => setIsOpenCarSeatsModal(false)}
      />
      <CreateTripModal
        opened={isOpenCreateTripModal}
        close={() => setIsOpenCreateTripModal(false)}
      />

    </div>
  );
};
