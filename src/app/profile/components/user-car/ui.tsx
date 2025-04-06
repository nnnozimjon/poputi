import { FaCarRear } from "react-icons/fa6";
import { LabeledContainer } from "../container";
import { AddCarModal } from "@/modals";
import { useState } from "react";
import { Button } from "@mantine/core";
import { useAppSelector } from "@/store/store";
import { useDriverDetails } from "@/hooks/useDriverDetails";

export const UserCar = () => {
  const user = useAppSelector((state) => state.user);
  const isDriver = user.isDriver;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data } = useDriverDetails(isDriver);

  return (
    <LabeledContainer
      label={"Авто"}
      className="col-span-full md:col-span-4 h-fit"
    >
      <div className="flex items-center justify-center">
        <div className="p-4 border border-solid border-main flex items-center justify-center rounded-full">
          <FaCarRear className="text-main size-10" />
        </div>
      </div>
      <br />

      {/* if is not driver */}
      {!isDriver && (
        <div className="w-full flex items-center justify-center">
          <Button
            onClick={() => setIsOpenModal(true)}
            variant="light"
            className="text-dark-blue"
          >
            Станьте водителем
          </Button>
        </div>
      )}

      {/* if is driver */}
      {isDriver && (
        <div className="flex flex-col gap-2">
          <h4>Марка авто: {data?.car_brand}</h4>
          <h4>Класс: {data?.car_model}</h4>
          <h4>Кузов: {data?.car_body_type}</h4>
          <h4>Цвет авто: {data?.car_color}</h4>
          <h4>Гос номер: {data?.plate_number}</h4>
        </div>
      )}

      <AddCarModal opened={isOpenModal} close={() => setIsOpenModal(false)} />
    </LabeledContainer>
  );
};
