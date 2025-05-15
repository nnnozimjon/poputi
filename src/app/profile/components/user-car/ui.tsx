import { FaCarRear } from "react-icons/fa6";
import { LabeledContainer } from "../container";
import { Text } from "@mantine/core";
import { useAppSelector } from "@/store/store";
import { useDriverDetails } from "@/hooks/useDriverDetails";
import Image from "next/image";
import { CarPlaceholderImage } from "@/assets";

export const UserCar = () => {
  const user = useAppSelector((state) => state.user);
  const isDriver = user.isDriver;

  const { data } = useDriverDetails(isDriver);

  return (
    <LabeledContainer
      label={"Инфо об авто"}
      className="col-span-full md:col-span-4 h-fit"
      icon={<FaCarRear className="text-secondary-200" />}
    >
      <div>
        <Text className="text-sm mb-2 text-secondary-200">Текущий автомобиль</Text>
        <div className="flex gap-4 items-center">
          <Image src={CarPlaceholderImage} width={120} height={80} alt="" className="rounded-xl" />
          <div>
            <Text className="text-bold text-sm">{`${data?.car_brand.name || 'N/A'}, ${data?.car_model.name || 'N/A'}`}</Text>
            <Text className="text-semibold text-sm text-secondary-200">{`${data?.car_body_type.name || 'N/A'}, ${data?.car_color.name || 'N/A'}`}</Text>
          </div>
        </div>
        <Text className="text-secondary-200 text-sm mt-4">Номерной знак</Text>
        <Text className="text-sm">{data?.plate_number || 'N/A'}</Text>
      </div>
      {/* <Button variant="outline" className="w-full my-4">Add Car Info</Button> */}
      {/* <Divider /> */}
      {/* <AddCarModal opened={isOpenModal} close={() => setIsOpenModal(false)} /> */}
    </LabeledContainer>
  );
};
