import { Button } from "@mantine/core";
import { LabeledContainer } from "../container";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";

export const UserDetails = () => {
  return (
    <LabeledContainer
      label={"Данные"}
      className="col-span-full md:col-span-4 h-fit"
    >
      {/* <p>Номер телефона подтвержден</p> */}
      <Button
        leftSection={<BsInfoCircleFill />}
        variant="transparent"
        className="text-gray-dark"
      >
        Подтвердите номер телефона
      </Button>
      <Button
        leftSection={<BsInfoCircleFill />}
        variant="transparent"
        className="text-gray-dark"
      >
        Подтвердите эл. почту
      </Button>
      <hr className="my-5 border-white-highlight" />
      <h4 className="text-red text-center">Удаление аккаунта</h4>
      <Button
        leftSection={<FaTrash />}
        variant="transparent"
        className="text-red hover:text-red"
      >
        Прейти
      </Button>
      <hr className="my-5 border-white-highlight" />
      <h4 className="text-gray-dark text-center mb-2">
        Активность пользователя
      </h4>
      <h5 className="text-gray-dark">
        Дата регистрации: {new Date().toLocaleDateString()}
      </h5>
      <h5 className="text-gray-dark">Поездки: 0</h5>
    </LabeledContainer>
  );
};
