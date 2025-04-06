"use client";

import { Button, Container, Flex, Stepper, Text } from "@mantine/core";
import { LabeledContainer } from "../profile/components";
import { BiCar } from "react-icons/bi";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";
import { useGetTrips } from "@/hooks";
import { useEffect, useState } from "react";

export default function TripsPage() {
  const { data: trips, isSuccess } = useGetTrips({
    departure_city: "",
    destination_city: "",
  });

  return (
    <Container size={"xl"}>
      <Flex gap={"md"} align={"center"} className="my-4">
        <div className="bg-main text-white p-2 rounded-full w-fit flex items-center justify-center text-2xl">
          <BiCar />
        </div>
        <div className="flex flex-col gap-0">
          {/* <p className="p-0 m-0 font-bold">Ойбек ⟶ Хучанд</p> */}
          <p className="p-0 m-0 font-bold">Все попутчики</p>
          {/* <p className="m-0 p-0">Дата: {new Date().toLocaleDateString()}</p> */}
        </div>
      </Flex>
      {trips && trips.data.length <= 0 ? (
        <div className="w-full h-96 flex items-center justify-center flex-col gap-5">
          <IoCarSport className="text-main size-40" />
          <Text className="text-lg text-dark-blue text-center">
            Попутчики не найдены. <br /> Пожалуйста, попробуйте выбрать другое
            время.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips?.data?.map((trip, key: number) => (
            <LabeledContainer
              key={key}
              labelStyle="text-xs text-dark"
              label={new Date(trip?.departure_time).toLocaleDateString()}
            >
              <Text className="text-sm text-gray mb-4">Путь</Text>
              <Stepper
                classNames={{
                  stepCompletedIcon: "bg-main rounded-full",
                  stepIcon: "border-main",
                  separator: "bg-main",
                }}
                active={2}
                orientation="horizontal"
              >
                <Stepper.Step
                  completedIcon={<FaLocationDot />}
                  label={trip?.departure_city}
                  description={new Date(
                    trip?.departure_time
                  )?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                />
                <Stepper.Step
                  completedIcon={<FaLocationDot />}
                  label={trip?.destination_city}
                  description={new Date(
                    trip?.destination_time
                  )?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                />
              </Stepper>
              <br />
              <div>
                <Text className="text-sm text-gray mb-4">Водитель</Text>
                <div className="flex items-center gap-4 shrink-0">
                  <RxAvatar className="text-6xl text-dark-blue" />
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <Text>
                        {trip?.driver?.user_fullname || "Имя пользователя"}
                      </Text>
                      <Text>
                        {trip?.driver?.car_brand},{trip?.driver?.car_model}
                      </Text>
                    </div>
                    <Link
                      href={"/reviews"}
                      className="no-underline text-dark-blue"
                    >
                      Отзывы
                    </Link>
                  </div>
                </div>
                <Button component={Link} href={`/booking?id=${trip?.id}`} className="mt-4 w-full bg-dark-blue hover:bg-dark-blue">
                  Забронировать
                </Button>
              </div>
            </LabeledContainer>
          ))}
        </div>
      )}

      <div className="mb-40" />
    </Container>
  );
}
