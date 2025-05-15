import { Button, Text } from "@mantine/core";
import { LabeledContainer } from "../container";
import { TbEPassport } from "react-icons/tb";

export const UserLevel = () => {
  return (
    <LabeledContainer
      label={"Driver License"}
      className="col-span-full md:col-span-4 h-fit"
      icon={<TbEPassport className="text-secondary-200 size-5" />}
    >
        <Text className="text-secondary-200 text-sm">Passport Number</Text>
        <Text className="mb-4">N/A</Text>

        <Text className="text-secondary-200 text-sm">Issue Date</Text>
        <Text className="mb-4">N/A</Text>

        <Text className="text-secondary-200 text-sm">Expiry Date</Text>
        <Text className="mb-4">N/A</Text>
      
      <Button variant="outline" className="w-full">Upload License Copy</Button>
    </LabeledContainer>
  );
};
