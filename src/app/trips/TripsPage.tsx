"use client";

import { Container, Flex, Group, Tabs, Text } from "@mantine/core";
import { BiCar } from "react-icons/bi";
import { IoBus, IoCarSport } from "react-icons/io5";
import { useGetTrips } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { TripCard } from "./components";
import { Filter } from "@/components/filter/filter";
import { LuDot } from "react-icons/lu";
import { useState } from "react";

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const searchParams = useSearchParams();
  const departureCity = searchParams.get("departure_city");
  const destinationCity = searchParams.get("destination_city");
  const departureTime = searchParams.get("departure_time");
  const passengers = searchParams.get("passengers");
  const type = searchParams.get("type");

  const { data: trips, isSuccess } = useGetTrips({
    departure_city: departureCity || "",
    destination_city: destinationCity || "",
    departure_time: departureTime || "",
    passengers: passengers || "",
    type: type || "",
  });

  return (
    <Container size={"xl"}>
      <Flex gap={"md"} align={"center"} className="my-4">
        <div className="bg-main text-white p-2 rounded-full w-fit flex items-center justify-center text-2xl">
          <BiCar />
        </div>
        <div className="flex flex-col gap-0">
          {departureCity && destinationCity ? (
            <p className="p-0 m-0 font-bold">
              {departureCity} ⟶ {destinationCity}
            </p>
          ) : (
            <p className="p-0 m-0 font-bold">Все попутчики</p>
          )}
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <Group visibleFrom="md" className="col-span-3 w-full">
            <Filter />
          </Group>
          <div className="md:col-span-9 col-span-1 w-full p-0 md:p-4 flex flex-col gap-4">
            <Tabs variant="unstyled" value={activeTab} onChange={(value) => setActiveTab(value || "all")} className="shadow-[0_0_10px_rgba(0,0,0,0.1)] px-4 rounded-2xl bg-white">
              <Tabs.List grow className="border-none no-underline text-[#054652] text-lg">
                <Tabs.Tab value="all" className={`text-[16px] p-6 font-semibold ${activeTab === "all" ? "border-b-2 border-solid border-[#054652]" : ""}`} leftSection={<LuDot size={20} />}>
                  All
                </Tabs.Tab>
                <Tabs.Tab value="bus" className={`text-[16px] p-6 font-semibold ${activeTab === "bus" ? "border-b-2 border-solid border-[#054652]" : ""}`} leftSection={<IoBus size={20} />}>
                  Bus
                </Tabs.Tab>
                <Tabs.Tab value="car" className={`text-[16px] p-6 font-semibold ${activeTab === "car" ? "border-b-2 border-solid border-[#054652]" : ""}`} leftSection={<IoCarSport size={20} />}>
                  Car
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
            {trips?.data?.map((trip, index: number) => (
              <TripCard key={index} />
            ))}
          </div>
        </div>
      )}

      <div className="mb-40" />
    </Container>
  );
}
