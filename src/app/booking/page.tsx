"use client";

import { Button, Container, Flex, Stepper, Text } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { LabeledContainer } from "../profile/components";
import { FaLocationDot } from "react-icons/fa6";
import { PiSeatbeltFill } from "react-icons/pi";
import { Fragment } from "react";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";

// isArchived: true
const seats = [
  [
    { id: 1, isDriver: true, isBooked: true, },
    { id: 2, isDriver: true, isBooked: true, price: 50 },
  ],
  [
    { id: 3, isDriver: true, isBooked: true },
    { id: 4, isDriver: true, isBooked: true },
    { id: 5, isDriver: true, isBooked: true, price: 40 },
  ],
];
export default function BookingPage() {
  // const params = useSearchParams();

  return (
    <Container size={"xl"}>
      <Flex gap={"md"} align={"center"} className="my-4">
        <h1 className="text-[18px] md:text-[2em]">Забронироват</h1>
      </Flex>

      <LabeledContainer label="Сегодня">
        <Container size={"xs"}>
          <Stepper classNames={{ stepCompletedIcon: 'bg-main rounded-full', stepIcon: 'border-main', separator: 'bg-main' }} active={2} orientation="horizontal">
            <Stepper.Step
              completedIcon={<FaLocationDot />}
              label="Душанбе"
              description="12:30"
            />
            <Stepper.Step
              completedIcon={<FaLocationDot />}
              label="Хучанд"
              description="15:00"
            />
          </Stepper>
          <br />
          <div>
            {seats?.map((group, index) => (
              <Fragment key={index}>
                <div className="flex items-center justify-between">
                  <Text> Ряд {index + 1}</Text>
                  <div className="flex gap-4 items-center">
                    {group?.map((seat, seatIndex) => (
                      <div
                        key={seatIndex}
                        className="border border-solid border-main p-2 rounded-md w-fit flex items-center justify-center text-2xl text-main"
                      >
                        <PiSeatbeltFill />
                      </div>
                    ))}
                  </div>
                  <Text>{group?.[group.length - 1]?.price} TJS</Text>
                </div>
                <br />
              </Fragment>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Text>📦 Посылка: </Text>
            <Text className="text-green">да ✔ </Text>
          </div>
          <br />
          <div className="flex items-center justify-between">
            <Button disabled className="cursor-text">
              Занято: 0
            </Button>
            <Button disabled className="cursor-text">
              Свободно: 0
            </Button>
          </div>
          <br />
          <div>
            <Text className="text-sm text-gray mb-4">Водитель</Text>
            <div className="flex items-center gap-4 shrink-0">
              <RxAvatar className="text-6xl text-dark-blue" />
              <div className="flex items-center justify-between w-full">
                <div>
                  <Text>Naziim</Text>
                  <Text>BYD, Song PLUS</Text>
                </div>
                <Link href={'/reviews'} className="no-underline text-dark-blue">Отзывы</Link>
              </div>
            </div>
          </div>
          <br />
          <Button className="w-full bg-dark-blue hover:bg-dark-blue">Забронировать</Button>
        </Container>
      </LabeledContainer>
      <div className="mb-96" />
    </Container>
  );
}
