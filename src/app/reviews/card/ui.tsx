import { Avatar, Rating, Text } from "@mantine/core";

export const ReviewCard = () => {
  return (
    <div className="border border-secondary-100 border-solid rounded-md p-4">
      <div className="flex gap-2">
        <Avatar size={36} />
        <div>
          <Text className="text-sm">UserName</Text>
          <Text className="text-[12px] text-secondary-200">Trip from / To</Text>
        </div>
      </div>
      <Rating className="mt-2" value={3} />
      <Text className="my-2 text-secondary-200 text-sm">
        description why this rating / nor / review !
      </Text>
      <Text className="text-[12px] text-secondary-200">15 ноября 2023</Text>
    </div>
  );
};
