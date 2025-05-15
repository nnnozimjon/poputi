import { LabeledContainer } from "../container";
import { Button, Divider, Text } from "@mantine/core";
import { MdOutlineDateRange, MdOutlineMail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { useAppSelector } from "@/store/store";

export const UserInfo = () =>{ 
  const user = useAppSelector((state) => state.user);
  return (
  <LabeledContainer
    label={"Личная информация"}
    className="col-span-full md:col-span-4 h-fit"
  >
    <div className="flex flex-col gap-2">
      {/*  */}
      <div className="flex gap-4 items-center">
        <MdOutlineDateRange className="text-secondary-200" />
        <div>
          <Text className="text-sm text-secondary-200">Имя ползователья</Text>
          <Text>{user?.user?.fullname || 'N/A'}</Text>
        </div>
      </div>

      {/*  */}
      <div className="flex gap-4 items-center">
        <LuPhone className="text-secondary-200" />
        <div>
          <Text className="text-sm text-secondary-200">Phone</Text>
          <Text>{user?.user?.phone_number || 'N/A'}</Text>
        </div>
      </div>

      {/*  */}
      <div className="flex gap-4 items-center">
        <MdOutlineMail className="text-secondary-200" />
        <div>
          <Text className="text-sm text-secondary-200">Адрес</Text>
          <Text>{user?.user?.street_address || 'N/A'}</Text>
        </div>
      </div>

      {/* <Button variant="outline" className="w-full my-4">
        Add Info
      </Button> */}
    </div>

    {/* <Divider /> */}
  </LabeledContainer>
)};
