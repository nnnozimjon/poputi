"use client";

import { Container, Flex, Group, Tabs, Text } from "@mantine/core";
import { BiCar } from "react-icons/bi";
import { IoBus, IoCarSport } from "react-icons/io5";
import { useGetTrips } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { TripCard } from "./components";
import { Filter } from "@/components/filter/filter";
import { LuDot } from "react-icons/lu";
import { useState, useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { formatDateWithDayAndTime } from "@/utils";

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [displayTime, setDisplayTime] = useState("");
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
    type: activeTab === "all" ? "" : activeTab,
  });

  useEffect(() => {
    if (!departureTime && (trips as any)?.data?.length > 0) {
      const now = new Date();
      const futureTrips = (trips as any).data.filter((trip: any) => new Date(trip.departure_time) > now);
      
      if (futureTrips.length > 0) {
        const earliestTrip = futureTrips.reduce((earliest: any, current: any) => {
          return new Date(current.departure_time) < new Date(earliest.departure_time) ? current : earliest;
        }, futureTrips[0]);

        setDisplayTime(earliestTrip.departure_time);
      }
    } else {
      setDisplayTime(departureTime || "");
    }
  }, [departureTime, trips]);

  return (
    <Container size={"xl"} className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-10">
        <Group visibleFrom="md" className="mt-10">
          <Filter />
        </Group>
        <div className="w-full p-0 md:p-4 flex flex-col gap-4">
          <Tabs variant="unstyled" value={activeTab} onChange={(value) => setActiveTab(value || "all")} className="shadow-[0_0_10px_rgba(0,0,0,0.1)] px-4 rounded-2xl bg-white mb-5">
            <Tabs.List grow className="border-none no-underline text-blue-600 text-lg">
              <Tabs.Tab value="all" className={`text-[16px] p-6 font-semibold ${activeTab === "all" ? "border-b-2 border-solid border-blue-600" : ""}`} leftSection={<LuDot size={20} />}>
                Все
              </Tabs.Tab>
              <Tabs.Tab value="car" className={`text-[16px] p-6 font-semibold ${activeTab === "car" ? "border-b-2 border-solid border-blue-600" : ""}`} leftSection={<IoCarSport size={20} />}>
                Автомобиль
              </Tabs.Tab>
              <Tabs.Tab value="bus" className={`text-[16px] p-6 font-semibold ${activeTab === "bus" ? "border-b-2 border-solid border-blue-600" : ""}`} leftSection={<IoBus size={20} />}>
                Автобус
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <p className="text-sm text-[#5f7c81] font-semibold flex item-center gap-2">
            <span className="text-blue-600">
              {(() => {
                const today = new Date();
                const tripDate = new Date(displayTime || '');
                const diffTime = tripDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

                if (diffDays === 0) return 'Сегодня';
                if (diffDays === 1) return 'Завтра';
                if (diffDays === -1) return 'Вчера';
                if (diffDays > 1) return `Через ${diffDays} дней`;
                if (diffDays < -1) return `${Math.abs(diffDays)} дней назад`;
                return '';
              })()}
            </span>
            <span>{departureCity}</span>
            <FaLongArrowAltRight className="mt-1" />
            <span>{destinationCity}</span>
          </p>
          {trips && trips.data.length <= 0 && <div className="w-full h-[500px] flex items-center justify-center flex-col gap-5">
            <IoCarSport className="text-main size-40" />
            <Text className="text-lg text-dark-blue text-center">
              Попутчики не найдены. <br /> Пожалуйста, попробуйте выбрать другое
              время.
            </Text>
          </div>}

          {trips?.data?.map((trip, index: number) => (
            <TripCard trip={(trip as any)} key={index} />
          ))}
        </div>
      </div>

      <div className="mb-40" />
    </Container>
  );
}
