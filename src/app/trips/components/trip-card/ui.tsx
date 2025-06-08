"use client";

import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import { IoLocationOutline, IoWalletOutline } from "react-icons/io5";
import { FaBus } from "react-icons/fa6";

export const TripCard = () => {
  // Example data for demonstration
  const departureTime = "12:30";
  const arrivalTime = "19:45";
  const duration = "7h 15m";
  const price = "£27.90";
  const departureCity = "London";
  const departureStation = "Waterloo Rail Station";
  const arrivalCity = "Manchester";
  const arrivalStation = "Airport Bus Station";
  const vehicleType = "Bus";
  const operator = "National Express";
  const seatsLeft = 4;
  const amenities = ["WiFi", "AC", "Luggage"];
  const driverName = "Nozimjon Shamsulloev";
  const driverAvatar = ""; // Add avatar URL if available

  return (
    <div className="w-full border rounded-2xl border-solid border-gray-light hover:border-blue hover:border-2 bg-white flex flex-col gap-4 md:px-6 md:py-[12px] p-4">
      {/* Top: Time, Route, Price */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Time and Route */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-lg text-dark-blue">{departureTime}</span>
            <span className="text-gray text-sm flex items-center gap-2">
              <span className="w-16 h-[2px] bg-gray-light inline-block" />
              <span>{duration}</span>
              <span className="w-16 h-[2px] bg-gray-light inline-block" />
            </span>
            <span className="font-semibold text-lg text-dark-blue">{arrivalTime}</span>
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
        {/* Price */}
        <div className="flex flex-col items-end min-w-[90px] hidden md:flex">
          <span className="text-xs text-gray">from</span>
          <span className="font-bold text-2xl text-main">{price}</span>
        </div>
      </div>
      {/* Divider */}
      {/* Details: Vehicle, Operator, Seats, Amenities, Driver */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Vehicle & Operator */}
        <div className="flex items-center gap-2">
          <FaBus className="text-main text-xl" />
          <span className="text-sm text-dark-blue">{vehicleType}</span>
          <span className="text-xs text-gray">|</span>
          <span className="text-sm text-gray">{operator}</span>
        </div>
        {/* Seats left */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray">Seats left:</span>
          <span className="font-semibold text-dark-blue">{seatsLeft}</span>
        </div>
        {/* Amenities */}
        {/* <div className="flex items-center gap-2">
          {amenities.map((amenity, idx) => (
            <span
              key={amenity}
              className="bg-gray-light text-xs text-gray px-2 py-0.5 rounded"
            >
              {amenity}
            </span>
          ))}
        </div> */}
        {/* Driver */}
        <div className="flex items-center gap-2 justify-between md:justify-end">
          <Image
            width={28}
            height={28}
            src={driverAvatar || "/default-avatar.png"}
            className="rounded-full object-cover size-7"
            alt={driverName}
          />
          <div className="flex md:hidden flex-col items-end min-w-[90px]">
            <span className="text-xs text-gray">from</span>
            <span className="font-bold text-2xl text-main">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
