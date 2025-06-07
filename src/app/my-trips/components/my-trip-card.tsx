"use client";
import { EditTripModal } from "@/modals/edit-trip";
import { formatDateWithDayAndTime } from "@/utils";
import { ActionIcon, Button } from "@mantine/core";
import { useState } from "react";
import { FaArrowRight, FaRegClock, FaRegUser } from "react-icons/fa6";
import { IoPricetagOutline } from "react-icons/io5";

export const MyTripCard = ({ trip, refetch }: any) => {
  const [editTripModalOpened, setEditTripModalOpened] = useState(false);

  const seats = trip?.car_seats || [];
  const seatsWithoutDriverSeat = seats.filter(
    (seat: any) => seat.is_driver_seat === false
  );
  const availableSeats = seatsWithoutDriverSeat.filter(
    (seat: any) => !seat.is_booked
  )?.length;
  const price = seats[1]?.price || seats[2]?.price;

  return (
    <div className="rounded-lg shadow-md p-6">
      <p className="flex items-center gap-4 font-bold">
        {trip?.departure_city} <FaArrowRight color="9CA3AF" />
        {trip?.destination_city}
      </p>
      <p className="text-gray flex items-center gap-2 mb-6">
        <FaRegClock /> {formatDateWithDayAndTime(new Date(trip?.departure_time))}
      </p>
      <div className="md:flex block gap-4 justify-between mb-6">
        <p className="text-gray flex items-center gap-2">
          <FaRegUser /> {availableSeats} места доступны
        </p>
        <p className="text-gray flex items-center gap-2">
          <IoPricetagOutline /> от {price} смн за место
        </p>
      </div>
      <p>Доступные места</p>
      <div className="grid md:grid-cols-2 grid-cols-4 gap-4 pt-3 mb-6">
        {seatsWithoutDriverSeat?.map((seat: any, index: number) => (
          <ActionIcon
            key={index}
            size="xl"
            variant="light"
            color="blue"
            className="w-full"
            disabled={seat.is_booked}
          >
            <FaRegUser />
          </ActionIcon>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Button variant="transparent" onClick={() => setEditTripModalOpened(true)}>Редактировать</Button>
      </div>

      <EditTripModal refetch={refetch} tripId={trip?.id} close={() => setEditTripModalOpened(false)} opened={editTripModalOpened} />
    </div>
  );
};
