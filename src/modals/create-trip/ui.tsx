import { useFindAllDriverSeats } from "@/hooks";
import {
  Alert,
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Fragment, useEffect, useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { GiCarKey } from "react-icons/gi";
import { PiSeatbeltFill } from "react-icons/pi";

interface Props {
  opened: boolean;
  close: () => void;
}

type Seat = {
  id: number;
  is_driver: boolean;
  isBooked: boolean;
};

type Trip = {
  departure_city: string | null;
  destination_city: string | null;
  departure_time: Date | null;
  destination_time: Date | null;
  is_sending_package_available: boolean;
  description: string;
  seats: Seat[][] | null;
};

export const CreateTripModal = (props: Props) => {
  const { data, isSuccess } = useFindAllDriverSeats();

  const [seats, setSeats] = useState([]);

  const initialFormData: Trip = {
    departure_city: null,
    destination_city: null,
    departure_time: null,
    destination_time: null,
    is_sending_package_available: false,
    description: "",
    seats: null,
  };

  const [formData, setFormData] = useState<Trip>(initialFormData);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateSeatStatus = (id: number) => {
    const updatedSeats: any = seats.map((innerArray: Seat[]) =>
      innerArray.map((seat) =>
        seat.id === id ? { ...seat, isBooked: !seat.isBooked } : seat
      )
    );

    setSeats(updatedSeats);
  };

  useEffect(() => {
    if (isSuccess) {
      const updatedData: any = data?.map((innerArray) =>
        innerArray.map((obj) => ({
          ...obj,
          isBooked: false,
        }))
      );

      setSeats(updatedData);
    }
  }, [isSuccess, data]);

  return (
    <Modal
      centered
      opened={props.opened}
      onClose={props.close}
      title="Создать поездку, куда вы едете?"
      size={"lg"}
      closeOnClickOutside={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Select
            withAsterisk
            label="Откуда"
            placeholder="Откуда"
            className="w-full"
            onChange={(value) => handleChange("departure_city", String(value))}
            value={String(formData.departure_city)}
          />
          <Select
            withAsterisk
            label="Куда"
            placeholder="Куда"
            className="w-full"
            onChange={(value) => handleChange("destination_city", String(value))}
            value={String(formData.destination_city)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <DateTimePicker
            withAsterisk
            label="Время поездки"
            placeholder={"Время поездки"}
            value={formData.departure_time}
            onChange={(value) => handleChange("departure_time", value as any)}
            leftSection={<BsFillCalendarDateFill />}
            minDate={new Date()}
            className="w-full"
          />
          <DateTimePicker
            withAsterisk
            label="Примерное время прибытия"
            placeholder={"Примерное время прибытия"}
            value={formData.destination_time}
            onChange={(value) => handleChange("destination_time", value as any)}
            leftSection={<BsFillCalendarDateFill />}
            minDate={new Date()}
            className="w-full"
          />
        </div>
        <Checkbox
          defaultChecked={formData.is_sending_package_available}
          label="📦 Посылка"
        />
        <Textarea
          value={formData.description}
          placeholder={`Улица, район отправление \nУлица, район прибитые`}
          label="Описание клиентам"
          className="h-24"
        />
        {seats?.map((group: Seat[], groupIndex) => (
          <Fragment key={groupIndex}>
            <div className="flex items-center justify-between">
              <Text />
              <div className="flex gap-4 items-center">
                {group?.map((seat, seatIndex) => (
                  <div
                    key={seatIndex}
                    onClick={() => updateSeatStatus(seat.id)}
                    className={`border border-solid p-2 rounded-md w-fit flex items-center cursor-pointer justify-center text-2xl ${
                      seat.isBooked || seat.is_driver
                        ? "border-secondary-200 text-secondary-200"
                        : "border-main text-main"
                    }`}
                  >
                    {seat.is_driver ? <GiCarKey /> : <PiSeatbeltFill />}
                  </div>
                ))}
              </div>
              <Text />
            </div>
          </Fragment>
        ))}
        <Alert className="font-semibold text-xs">
          Все места свободны по умолчанию. Если везете своих пассажиров, нажмите
          на сиденья, чтобы отметить их занятыми. Серые сиденья - заняты!!!
        </Alert>
      </div>
      <Group mt="lg" justify="flex-end">
        <Button onClick={props.close} variant="default">
          Отменить
        </Button>
        <Button
          onClick={() => console.log(seats)}
          className="bg-dark-blue hover:bg-dark-blue"
        >
          Сохранить
        </Button>
      </Group>
    </Modal>
  );
};
