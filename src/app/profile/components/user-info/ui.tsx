import { LabeledContainer } from "../container";
import { Text } from "@mantine/core";
import { MdOutlineDateRange, MdOutlineMail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";

export const UserInfo = ({ user }: any) => {
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
            <Text>{user?.username || 'N/A'}</Text>
          </div>
        </div>

        {/*  */}
        <div className="flex gap-4 items-center">
          <LuPhone className="text-secondary-200" />
          <div>
            <Text className="text-sm text-secondary-200">Телефон</Text>
            <Text>{user?.phone_number || 'N/A'}</Text>
          </div>
        </div>

        {/*  */}
        <div className="flex gap-4 items-center">
          <MdOutlineMail className="text-secondary-200" />
          <div>
            <Text className="text-sm text-secondary-200">Адрес</Text>
            <Text>{user?.address || 'N/A'}</Text>
          </div>
        </div>

        {/* <Button variant="outline" className="w-full my-4">
        Add Info
      </Button> */}
      </div>

      {/* <Divider /> */}
    </LabeledContainer>
  )
};
