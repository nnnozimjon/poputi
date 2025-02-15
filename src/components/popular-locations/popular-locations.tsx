import { GrMapLocation } from "react-icons/gr";
import { Text } from "@mantine/core";
import { LocationCard } from "./location-card";

export const PopularLocations = () => {
  return (
    <div>
      <Text className="text-green text-center text-2xl font-semibold my-5">
        <GrMapLocation /> Популярные направления
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }, (_, index) => (
          <LocationCard key={index} />
        ))}
      </div>
    </div>
  );
};
