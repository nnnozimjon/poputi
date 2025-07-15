"use client";

import { Container, Group, Tabs, Text, Drawer, ActionIcon, Button } from "@mantine/core";
import { IoBus, IoCarSport, IoFilter } from "react-icons/io5";
import { useGetTrips } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { TripCard } from "./components";
import { Filter } from "@/components/filter/filter";
import { LuDot } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function TripsPage() {
  const searchParams = useSearchParams();
  const [mobileFilterOpened, setMobileFilterOpened] = useState(false);

  const departureCity = searchParams.get("departure_city");
  const destinationCity = searchParams.get("destination_city");
  const departureTime = searchParams.get("departure_time");
  const passengers = searchParams.get("passengers");
  const typeParam = searchParams.get("type") || "all";
  const priceSort = searchParams.get("price_sort") || "all";
  const pickupTimeRange = searchParams.get("pickup_time_range") || "all";
  const trustSafety = searchParams.get("trust_safety") || "";
  const amenities = searchParams.get("amenities") || "";

  const [activeTab, setActiveTab] = useState(typeParam);
  const [displayTime, setDisplayTime] = useState("");
  const [page, setPage] = useState(1);

  // Store all loaded trips for infinite scroll
  const [allTrips, setAllTrips] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);

  // To reset trips when filters change
  const prevFiltersRef = useRef<string>("");

  // Check if any filters are active
  const hasActiveFilters = priceSort !== "all" || pickupTimeRange !== "all" || trustSafety || amenities;

  // Compose a string of all filter params to detect changes
  const filterKey = JSON.stringify({
    departure_city: departureCity || "",
    destination_city: destinationCity || "",
    departure_time: departureTime || "",
    passengers: passengers || "",
    type: activeTab === "all" ? "" : activeTab,
    price_sort: priceSort,
    pickup_time_range: pickupTimeRange,
    trust_safety: trustSafety,
    amenities: amenities,
  });

  const { data: trips, isSuccess, refetch, isFetching } = useGetTrips({
    page: page,
    limit: 10,
    departure_city: departureCity || "",
    destination_city: destinationCity || "",
    departure_time: departureTime || "",
    passengers: passengers || "",
    type: activeTab === "all" ? "" : activeTab,
    price_sort: priceSort,
    pickup_time_range: pickupTimeRange,
    trust_safety: trustSafety,
    amenities: amenities,
  });

  // Reset trips when filters change
  useEffect(() => {
    if (prevFiltersRef.current !== filterKey) {
      setAllTrips([]);
      setPage(1);
      setMeta(null);
      prevFiltersRef.current = filterKey;
    }
  }, [filterKey]);

  // Append new trips to allTrips when page or trips change
  useEffect(() => {
    if (trips && trips.data) {
      if (page === 1) {
        setAllTrips(trips.data);
      } else {
        setAllTrips((prev) => {
          // Avoid duplicates if API returns overlapping data
          const prevIds = new Set(prev.map((t: any) => t.id));
          const newTrips = trips.data.filter((t: any) => !prevIds.has(t.id));
          return [...prev, ...newTrips];
        });
      }
      setMeta(trips.meta);
    }
  }, [trips, page]);

  useEffect(() => {
    const paramType = searchParams.get("type") || "all";
    if (paramType !== activeTab) {
      setActiveTab(paramType);
    }
  }, [searchParams, activeTab]);

  // Refetch on page change (for new data)
  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (!departureTime && (trips as any)?.data?.length > 0) {
      const now = new Date();
      const futureTrips = (trips as any).data.filter(
        (trip: any) => new Date(trip.departure_time) > now
      );

      if (futureTrips.length > 0) {
        const earliestTrip = futureTrips.reduce(
          (earliest: any, current: any) => {
            return new Date(current.departure_time) <
              new Date(earliest.departure_time)
              ? current
              : earliest;
          },
          futureTrips[0]
        );

        setDisplayTime(earliestTrip.departure_time);
      }
    } else {
      setDisplayTime(departureTime || "");
    }
  }, [departureTime, trips]);

  return (
    <Container size={"xl"} className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-10">
        {/* Desktop Filter */}
        <Group visibleFrom="md" className="mt-10 h-fit">
          <Filter />
        </Group>

        <div className="w-full p-0 md:p-4 flex flex-col gap-4">
          <Tabs
            variant="unstyled"
            value={activeTab}
            onChange={(value) => {
              const newValue = value || "all";
              setActiveTab(newValue);
              setPage(1); // Reset page on tab change
              const params = new URLSearchParams(searchParams.toString());
              params.set("type", newValue);
              window.history.pushState(null, "", `?${params.toString()}`);
            }}
            className="shadow-[0_0_10px_rgba(0,0,0,0.1)] px-4 rounded-2xl bg-white mb-5"
          >
            <Tabs.List grow className="border-none no-underline text-blue-600 text-lg">
              <Tabs.Tab
                value="all"
                className={`text-[16px] p-6 font-semibold ${activeTab === "all" ? "border-b-2 border-solid border-blue-600" : ""
                  }`}
                leftSection={<LuDot size={20} />}
                classNames={{
                  tabLabel: "md:block hidden"
                }}
              >
                Все
              </Tabs.Tab>
              <Tabs.Tab
                value="car"
                className={`text-[16px] p-6 font-semibold ${activeTab === "car" ? "border-b-2 border-solid border-blue-600" : ""
                  }`}
                leftSection={<IoCarSport size={20} />}
                classNames={{
                  tabLabel: "md:block hidden"
                }}
              >
                С попутчиками
              </Tabs.Tab>
              <Tabs.Tab
                value="bus"
                className={`text-[16px] p-6 font-semibold ${activeTab === "bus" ? "border-b-2 border-solid border-blue-600" : ""
                  }`}
                leftSection={<IoBus size={20} />}
                classNames={{
                  tabLabel: "md:block hidden"
                }}
              >
                Автобус
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Group display={'flex'} justify={'space-between'}>
            <p className="text-sm text-[#5f7c81] font-semibold flex item-center gap-2">
              <span className="text-blue-600">
                {(() => {
                  const today = new Date();
                  const tripDate = new Date(displayTime || "");
                  const diffTime = tripDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

                  if (diffDays === 0) return "Сегодня";
                  if (diffDays === 1) return "Завтра";
                  if (diffDays === -1) return "Вчера";
                  if (diffDays > 1) return `Через ${diffDays} дней`;
                  if (diffDays < -1) return `${Math.abs(diffDays)} дней назад`;
                  return "";
                })()}
              </span>
              <span>{departureCity}</span>
              <FaLongArrowAltRight className="mt-1" />
              <span>{destinationCity}</span>
            </p>
            <Group hiddenFrom="md">
              <ActionIcon
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 60 }}
                size="lg"
                radius="xl"
                aria-label="Открыть фильтры"
                onClick={() => setMobileFilterOpened(true)}
                style={{ boxShadow: '0 2px 8px rgba(30, 203, 255, 0.15)' }}
              >
                <IoFilter size={22} />
              </ActionIcon>
            </Group>
          </Group>

          {allTrips.length === 0 && (
            <div className="w-full h-[500px] flex items-center justify-center flex-col gap-5">
              {typeParam === "bus" ? <IoBus className="text-main size-40" /> : <IoCarSport className="text-main size-40" />}
              <Text className="text-lg text-dark-blue text-center">
                Попутчики не найдены. <br /> Пожалуйста, попробуйте выбрать другое
                время.
              </Text>
            </div>
          )}

          {allTrips.map((trip, index: number) => (
            <TripCard trip={trip as any} key={trip.id || index} />
          ))}

          {meta && meta.page < meta.lastPage && (
            <div className="flex justify-center">
              <Button
                className="w-fit px-8 py-3 rounded-full bg-[#00baff] hover:bg-[#00a3e6] text-white font-semibold text-base shadow-none border-none transition-colors duration-200"
                variant="filled"
                size="md"
                loading={isFetching}
                onClick={() => {
                  setPage((prevPage) => prevPage + 1);
                }}
              >
                Показать больше
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        opened={mobileFilterOpened}
        onClose={() => setMobileFilterOpened(false)}
        title="Фильтры"
        size="100%"
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <div className="p-4">
          <Filter />
        </div>
      </Drawer>

      <div className="mb-40" />
    </Container>
  );
}
