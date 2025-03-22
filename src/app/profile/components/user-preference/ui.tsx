import { Button } from "@mantine/core";
import { LabeledContainer } from "../container";
import { FaCheckCircle } from "react-icons/fa";

export const UserPreference = () => {
  return (
    <LabeledContainer
      label={"Предпочтения"}
      className="col-span-full md:col-span-4 h-fit"
    >
      <Button
        leftSection={<FaCheckCircle />}
        variant="transparent"
        className="text-main text-center w-full"
      >
        Укажите свои предпочтения
      </Button>
    </LabeledContainer>
  );
};
