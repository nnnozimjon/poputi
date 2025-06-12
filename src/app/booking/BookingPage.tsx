"use client";

import { Button, Checkbox, Container, Flex, Stepper, Text } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import { PiSeatbeltFill } from "react-icons/pi";
import { Fragment } from "react";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import { useState } from "react";
import { useCreateBooking, useGetTripById } from "@/hooks";
import { GiCarKey } from "react-icons/gi";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/store";
import { redirect } from "@/utils";
import { IoCarSport } from "react-icons/io5";

export default function BookingPage() {
  const user = useAppSelector((state) => state.user);

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
    if (!selectedSeats.length) return 0;
    const seatsTotal = selectedSeats.reduce((total, seatId) => {
      const seat = trip?.car_seats?.find(s => s.id === seatId);
      return total + (seat ? Number(seat.price) : 0);
    }, 0);
    const tjsFee = selectedSeats.length * 3;
    return seatsTotal + tjsFee;
  };

  const handleBooking = () => {
    // if (!user.isAuthenticated) {
    //   return redirect('/auth')
    // }

    redirect('/checkout')
    // bookSeats({
    //   trip_id: tripId as string,
    //   seat_ids: selectedSeats,
    // }, {
    //   onSuccess: () => {
    //     toast.success('Места успешно забронированы');
    //     refetch();
    //     setSelectedSeats([]);
    //   },
    //   onError: () => {
    //     toast.error('Не удалось забронировать места');
    //   }
    // });
  };

  if (!tripId) {
    return (
      <div className="w-full h-96 flex items-center justify-center flex-col gap-5 mb-20">
        <IoCarSport className="text-main size-40" />
        <Text className="text-lg text-dark-blue text-center">
          Поездка не выбрана. <br />
          Пожалуйста, выберите поездку из списка доступных.
        </Text>
        <Button component={Link} href="/trips" className="bg-main">
          Вернуться к поездкам
        </Button>
      </div>
    );
  }

  return (
    <Container size="xl" className="mt-5 md:mt-10 px-0 md:px-10">
      <div className="px-4 md:px-6">
        <h1 className="text-[18px] md:text-4xl text-blue-600">{trip?.departure_time ? new Date(trip.departure_time).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
        }).toLocaleUpperCase() : ''}</h1>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 md:col-span-8 bg-white">
            <div className="shadow-[0_0_3px_rgba(0,0,0,0.1)] rounded-lg p-4">
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
            </div>
            <br />
            <div className="shadow-[0_0_3px_rgba(0,0,0,0.1)] rounded-lg p-4">
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
            <br />
            <div className="flex items-center justify-between shadow-[0_0_3px_rgba(0,0,0,0.1)] rounded-lg p-4">
              <Text>📦 Посылка: </Text>
              <Text className={trip?.is_sending_package_available ? 'text-green' : 'text-red'}>{trip?.is_sending_package_available ? 'да ✔' : 'нет ❌'}</Text>
            </div>
            <br />
            <div className="flex items-center justify-between shadow-[0_0_3px_rgba(0,0,0,0.1)] rounded-lg p-4">
              <Button disabled className="cursor-text">
                Занято: {trip?.car_seats?.filter(seat => seat.is_booked).length}
              </Button>
              <Button disabled className="cursor-text">
                Свободно: {trip?.car_seats?.filter(seat => !seat.is_booked).length}
              </Button>
            </div>
            <br />
            <div className="shadow-[0_0_3px_rgba(0,0,0,0.1)] rounded-lg p-4">
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
          </div>
          <div className="col-span-12 md:col-span-4 h-fit">
            <div className="bg-white rounded-lg p-4 shadow-[0_0_3px_rgba(0,0,0,0.1)]">
              <p className="text-lg text-blue-600">{trip?.departure_time ? new Date(trip.departure_time).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                weekday: 'long',
              }).toLocaleUpperCase() : ''}</p>
              <div className="flex items-center justify-between">
                <Text className="text-secondary-200">Выбранные места:</Text>
                <Text className="text-dark-blue">{selectedSeats.length}</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-secondary-200">Общая стоимость:</Text>
                <Text className="text-dark-blue">{calculateTotalPrice()} TJS</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-secondary-200">Комиссия за бронирование:</Text>
                <Text className="text-dark-blue">{selectedSeats.length * 3} TJS</Text>
              </div>
              <div className="mt-4">
                <Checkbox
                  label={
                    <Text size="sm">
                      Я согласен с{' '}
                      <Link href="/terms" className="text-main hover:underline">
                        условиями использования
                      </Link>{' '}
                      и{' '}
                      <Link href="/privacy" className="text-main hover:underline">
                        политикой конфиденциальности
                      </Link>
                    </Text>
                  }
                  required
                />
              </div>
            </div>
            <br />
            <Button
              disabled={trip?.car_seats?.filter(seat => seat.is_booked).length === trip?.car_seats?.length}
              loading={isPending}
              className="w-full bg-main hover:bg-blue-600 text-white font-bold text-lg rounded-full py-3 px-6 transition-all duration-200 shadow-none border-none"
              style={{ minHeight: 56 }}
              onClick={handleBooking}
            >
              Бронировать
            </Button>
          </div>
        </div>
        <div className="mb-96" />
      </div>
    </Container>
  );
}
