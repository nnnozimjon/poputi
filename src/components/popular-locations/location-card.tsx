import { Flex, Text } from "@mantine/core";
import Image from "next/image";

export const LocationCard = () => {
  return (
    <div className="relative h-fit">
      <Image
        layout="responsive"
        width={"400"}
        height={"230"}
        className="rounded-2xl"
        src="https://fly.tj/citiesImages/LBD.webp"
        alt="side"
      />
      <div className="bg-black absolute bottom-2 w-full rounded-2xl p-3 bg-opacity-50">
        <Flex align={"center"} justify={"space-between"}>
          <Text size="lg" className="font-bold text-white">
            Хучанд
          </Text>
          <Text size="lg" className="font-semibold text-white">
            150 TJS
          </Text>
        </Flex>
      </div>
    </div>
  );
};
