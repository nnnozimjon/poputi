"use client";

import Image from "next/image";
import { FaCar, FaChevronRight } from "react-icons/fa6";
import { IoLocationOutline, IoWalletOutline } from "react-icons/io5";
import { FaBus } from "react-icons/fa6";
import { calculateDuration, formatDateWithDayAndTime, formatTimeOnly, redirect } from "@/utils";
import { Divider } from "@mantine/core";


interface TripCardProps {
  trip: {
    id: string;
    departure_city: string;
    destination_city: string;
    departure_time: string;
    destination_time: string;
    created_at: string;
    driver: {
      user_fullname: string;
      car_model: string;
      car_brand: string;
    };
    tripSeats: Array<{
      id: number;
      trip_id: string;
      seat_id: number;
      price: string;
      status: string;
    }>;
  };
}

export const TripCard = ({ trip }: TripCardProps) => {
  const departureTime = formatTimeOnly(new Date(trip.departure_time));
  const arrivalTime = formatTimeOnly(new Date(trip.destination_time));
  const duration = calculateDuration(new Date(trip.departure_time), new Date(trip.destination_time));
  const price = Number(trip.tripSeats[1]?.price).toFixed(0);
  const departureCity = trip.departure_city;
  const departureStation = trip.departure_city;
  const arrivalCity = trip.destination_city;
  const arrivalStation = trip.destination_city;
  const vehicleType = trip.driver.car_model;
  const operator = trip.driver.car_brand;
  const seatsLeft = trip.tripSeats.filter((seat) => seat.status === "available").length;
  const driverName = trip.driver.user_fullname;
  const driverAvatar = "";

  return (
    <div onClick={() => {
      if (seatsLeft === 0 || new Date(trip.departure_time) < new Date()) {
        return;
      }

      redirect(`/booking?id=${trip.id}`);
    }} className={`w-full border rounded-2xl border-solid border-gray-light bg-white flex flex-col gap-4 md:px-6 md:py-[12px] p-4 relative ${seatsLeft === 0 || new Date(trip.departure_time) < new Date() ? 'opacity-50' : 'hover:border-blue hover:border-2 cursor-pointer'}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sm md:text-lg text-dark-blue">{departureTime}</span>
            <span className="text-gray text-sm flex items-center gap-2">
              <span className="w-16 h-[2px] bg-gray-light inline-block" />
              <span>{duration}</span>
              <span className="w-16 h-[2px] bg-gray-light inline-block" />
            </span>
            <span className="font-semibold text-sm md:text-lg text-dark-blue">{arrivalTime}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-bold text-dark-blue">{departureCity}</span>
              <span className="text-xs text-gray">{departureStation}</span>
            </div>
            <FaChevronRight className="text-gray text-lg" />
            <div className="flex flex-col">
              <span className="font-bold text-dark-blue">{arrivalCity}</span>
              <span className="text-xs text-gray">{arrivalStation}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end min-w-[90px] hidden md:flex">
          {seatsLeft === 0 || new Date(trip.departure_time) < new Date() ? (
            <span className="text-lg font-semibold text-blue-600">
              {new Date(trip.departure_time) < new Date() ? 'Время вышло' : 'Мест нет'}</span>
          ) : (
            <>
              <span className="text-xs text-gray">от</span>
              <span className="font-bold text-2xl text-main">{price}
                <span className="text-sm"> СМН</span>
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 mt-2">
        <div className="flex items-center gap-2">
          {trip?.tripSeats?.length > 8 ? (
            <FaBus className="text-main text-xl" />
          ) : (
            <FaCar className="text-main text-xl" />
          )}
          <span className="text-sm text-dark-blue">{vehicleType}</span>
          <span className="text-xs text-gray">|</span>
          <span className="text-sm text-gray">{operator}</span>
        </div>

        <div className="flex items-center gap-2 justify-between md:justify-end md:hidden">
          {seatsLeft === 0 || new Date(trip.departure_time) < new Date() ? (
            <span className="text-lg font-semibold text-blue-600">
              {new Date(trip.departure_time) < new Date() ? 'Время вышло' : 'Мест нет'}</span>
          ) : (
            <>
              <span className="text-xs text-gray">от</span>
              <span className="font-bold text-2xl text-main">{price}
                <span className="text-sm"> СМН</span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
