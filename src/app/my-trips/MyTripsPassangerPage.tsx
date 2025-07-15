"use client";
import {
  Container,
  Text,
} from "@mantine/core";
import { useGetMyOrders } from "@/hooks";
import { useState } from "react";
import { CreateTripModal } from "@/modals";
import { IoCarSport } from "react-icons/io5";
import { TripPurchaseCard } from "./components/trip-purchase-card";


export function MyTripsPassangerPage() {
  const [isOpenCreateTripModal, setIsOpenCreateTripModal] = useState(false);
  const { data, refetch, isLoading } = useGetMyOrders();

  const trip = {
    id: 1,
    date: "2024-02-15T09:30:00Z",
    from: "San Francisco, CA",
    to: "Los Angeles, CA",
    seats: 2,
    driver: {
      name: "Michael Chen",
      avatar: "",
      rating: 4.8,
      car: "Tesla Model 3 • Midnight Silver"
    },
    status: "active",
    price: 45.0,
    boughtSeats: [
      {
        seatNumber: 1,
        price: 45.0
      },
      {
        seatNumber: 2,
        price: 45.0
      }
    ]
  }
  return (
    <Container size="xl" className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Мои поездки</h1>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Здесь вы можете просмотреть и управлять своими поездками.
      </p>

      {!isLoading && (!data || data.length === 0) && (
        <div className="w-full h-[500px] flex items-center justify-center flex-col gap-5">
          <IoCarSport className="text-main size-40" />
          <Text className="text-lg text-dark-blue text-center">
            У вас пока нет поездок. <br /> Бронь свою первую поездку прямо сейчас!
          </Text>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {data?.map((trip: any) => (
          <TripPurchaseCard trip={trip} />
        ))}
      </div>
      <CreateTripModal
        refetch={refetch}
        opened={isOpenCreateTripModal}
        close={() => setIsOpenCreateTripModal(false)}
      />
    </Container>
  );
}
