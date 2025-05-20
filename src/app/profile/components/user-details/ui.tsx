import { Button, Text } from "@mantine/core";
import { LabeledContainer } from "../container";
import { FaPassport } from "react-icons/fa";

export const UserDetails = () => {
  return (
    <LabeledContainer
      label={"Паспорт"}
      className="col-span-full md:col-span-4 h-fit"
      icon={<FaPassport className="text-secondary-200 size-5" />}
    >
        <Text className="text-secondary-200 text-sm">Номер паспорта</Text>
        <Text className="mb-4">N/A</Text>

        <Text className="text-secondary-200 text-sm">Дата выпуска</Text>
        <Text className="mb-4">N/A</Text>

        <Text className="text-secondary-200 text-sm">Дата истечения срока действия</Text>
        <Text className="mb-4">N/A</Text>
      
      <Button variant="outline" className="w-full">Upload Passport Copy</Button>
    </LabeledContainer>
  );
};
