"use client";

import { Button, Container, Flex, Stepper, Text } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { LabeledContainer } from "../profile/components";
import { FaLocationDot } from "react-icons/fa6";
import { PiSeatbeltFill } from "react-icons/pi";
import { Fragment } from "react";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import { useState } from "react";
import { useCreateBooking, useGetTripById } from "@/hooks";
import { GiCarKey } from "react-icons/gi";
import { toast } from "react-toastify";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get('id');

  const { data: trip, refetch } = useGetTripById(tripId as string);
  const { mutate: bookSeats, isPending } = useCreateBooking();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seatId: number, isBooked: boolean) => {
    if (isBooked) return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      return [...prev, seatId];
    });
  };

  const calculateTotalPrice = () => {
    if (!trip?.car_seats) return 0;
    return selectedSeats.reduce((total, seatId) => {
      const seat = trip.car_seats.find(s => s.id === seatId);
      return total + (seat ? Number(seat.price) : 0);
    }, 0);
  };

  const handleBooking = () => {
    bookSeats({
      trip_id: tripId as string,
      seat_ids: selectedSeats,
    }, {
      onSuccess: () => {
        toast.success('Места успешно забронированы');
        refetch();
        setSelectedSeats([]);
      },
      onError: () => {
        toast.error('Не удалось забронировать места');
      }
    });
  };

  if (!tripId) {
    return (
      <Container size="xl" className="py-8">
        <Text>No trip selected</Text>
        <Button component={Link} href="/trips" className="mt-4">
          Back to Trips
        </Button>
      </Container>
    );
  }

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
              label={trip?.departure_city}
              description={trip?.departure_time ? new Date(trip.departure_time).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              }) : ''}
            />
            <Stepper.Step
              completedIcon={<FaLocationDot />}
              label={trip?.destination_city}
              description={trip?.destination_time ? new Date(trip.destination_time).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              }) : ''}
            />
          </Stepper>
          <br />
          <div>
            {Array.from({ length: Math.max(...trip?.car_seats?.map(seat => seat.seat_row) || [0]) }).map((_, rowIndex) => {
              const rowSeats = trip?.car_seats?.filter(seat => seat.seat_row === rowIndex + 1) || [];
              return (
                <Fragment key={rowIndex}>
                  <div className="flex items-center justify-between">
                    <Text>Ряд {rowIndex + 1}</Text>
                    <div className="flex gap-4 items-center">
                      {rowSeats.map((seat) => (
                        <div
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id, seat.is_booked)}
                          className={`border border-solid p-2 rounded-md w-fit flex items-center justify-center text-2xl cursor-pointer ${seat.is_booked
                              ? "border-secondary-200 text-secondary-200 cursor-not-allowed"
                              : selectedSeats.includes(seat.id)
                                ? "border-main bg-main text-white"
                                : "border-main text-main hover:bg-main/10"
                            }`}
                        >
                          {seat.is_driver_seat ? <GiCarKey /> : <PiSeatbeltFill />}
                        </div>
                      ))}
                    </div>
                    <Text>{rowSeats[rowSeats.length - 1]?.price} TJS</Text>
                  </div>
                  <br />
                </Fragment>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <Text>📦 Посылка: </Text>
            <Text className={trip?.is_sending_package_available ? 'text-green' : 'text-red'}>{trip?.is_sending_package_available ? 'да ✔' : 'нет ❌'}</Text>
          </div>
          <br />
          <div className="flex items-center justify-between">
            <Button disabled className="cursor-text">
              Занято: {trip?.car_seats?.filter(seat => seat.is_booked).length}
            </Button>
            <Button disabled className="cursor-text">
              Свободно: {trip?.car_seats?.filter(seat => !seat.is_booked).length}
            </Button>
          </div>
          <br />
          <div className="flex items-center justify-between">
            <Text className="font-semibold">Выбранные места:</Text>
            <Text className="font-semibold">{selectedSeats.length}</Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-semibold">Общая стоимость:</Text>
            <Text className="font-semibold">{calculateTotalPrice()} TJS</Text>
          </div>
          <br />
          <div>
            <Text className="text-sm text-gray mb-4">Водитель</Text>
            <div className="flex items-center gap-4 shrink-0">
              <RxAvatar className="text-6xl text-dark-blue" />
              <div className="flex items-center justify-between w-full">
                <div>
                  <Text>{trip?.driver?.user_fullname}</Text>
                  <Text>{trip?.driver?.car_brand}, {trip?.driver?.car_model}</Text>
                </div>
                <Link href={'/reviews'} className="no-underline text-dark-blue">Отзывы</Link>
              </div>
            </div>
          </div>
          <br />
          <Button disabled={trip?.car_seats?.filter(seat => seat.is_booked).length === trip?.car_seats?.length} loading={isPending} className="w-full bg-dark-blue hover:bg-dark-blue" onClick={handleBooking}>Забронировать</Button>
        </Container>
      </LabeledContainer>
      <div className="mb-96" />
    </Container>
  );
}
