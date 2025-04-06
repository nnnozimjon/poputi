import { Flex, Text } from "@mantine/core";
import Image from "next/image";

interface Props {
  name: string
  img: string
}
export const LocationCard = ({ name, img }: Props) => {
  return (
    <div className="relative h-[230px]">
      <div className="relative w-full h-full">
        <Image
          fill
          className="rounded-2xl object-cover"
          src={img}
          alt="side"
        />
      </div>
      <div className="bg-black absolute bottom-0 w-full rounded-2xl p-3 bg-opacity-50">
        <Flex align={"center"} justify={"space-between"}>
          <Text size="lg" className="font-bold text-white">
            {name}
          </Text>
        </Flex>
      </div>
    </div>
  );
};
