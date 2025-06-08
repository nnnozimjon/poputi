"use client";
import { Button, Container, Text } from "@mantine/core";
import { MyTripCard } from "./components/my-trip-card";
import { useGetMyTrips } from "@/hooks";
import { useState } from "react";
import { CreateTripModal } from "@/modals";
import { IoCarSport } from "react-icons/io5";

export function MyTripsPage() {
  const [isOpenCreateTripModal, setIsOpenCreateTripModal] = useState(false);
  const { data, refetch, isLoading } = useGetMyTrips();

  return (
    <Container size="xl" className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Мои поездки</h1>
        <Button className="bg-main hover:bg-blue-dark" onClick={() => setIsOpenCreateTripModal(true)}>Создать</Button>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        Здесь вы можете просмотреть и управлять своими поездками.
      </p>

      {!isLoading && (!data?.data || data.data.length === 0) && (
        <div className="w-full h-[500px] flex items-center justify-center flex-col gap-5">
          <IoCarSport className="text-main size-40" />
          <Text className="text-lg text-dark-blue text-center">
            У вас пока нет поездок. <br /> Создайте свою первую поездку прямо сейчас!
          </Text>
          <Button
            onClick={() => setIsOpenCreateTripModal(true)}
            className="mt-4 bg-main hover:bg-blue-dark"
          >
            Создать поездку
          </Button>
        </div>
      )}

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {data?.data?.map((trip, index: number) => (
          <MyTripCard refetch={refetch} key={index} trip={trip} />
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
