import { RxAvatar } from "react-icons/rx";
import { LabeledContainer } from "../container";
import { Button } from "@mantine/core";
import { BiEdit } from "react-icons/bi";
import { FaCarOn } from "react-icons/fa6";

export const UserInfo = () => {
  return (
    <LabeledContainer
      label={"Username"}
      className="col-span-full md:col-span-4 h-fit"
    >
      <div className="flex gap-2 justify-between items-center">
        <RxAvatar className="size-16 text-main" />
        <div className="flex flex-col justify-end items-baseline">
          <Button
            leftSection={<BiEdit />}
            variant="transparent"
            className="text-main"
          >
            Редактировать профиль
          </Button>
          <Button
            leftSection={<FaCarOn />}
            variant="transparent"
            className="text-main"
          >
            Редактировать авто
          </Button>
        </div>
      </div>
    </LabeledContainer>
  );
};
