import { useCities, useCreateTrip, useFindAllDriverSeats } from "@/hooks";
import { useAppSelector } from "@/store/store";
import { mapToSelectOptions } from "@/utils";
import {
  Alert,
  Button,
  Checkbox,
  Group,
  Input,
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
import { toast } from "react-toastify";

interface Props {
  opened: boolean;
  close: () => void;
  refetch?: () => void;
}

type Seat = {
  id: number;
  is_driver: boolean;
  price?: number;
  isBooked: boolean;
};

type Trip = {
  departure_city: string;
  destination_city: string;
  departure_time: Date | null;
  destination_time: Date | null;
  is_sending_package_available: boolean;
  description: string;
  seats: Seat[][] | null;
};

export const CreateTripModal = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  const { mutate } = useCreateTrip();

  const { data, isSuccess } = useFindAllDriverSeats(user.isAuthenticated);
  const { data: cities } = useCities();

  const mappedCities = mapToSelectOptions(cities ?? [], "name", "name");

  const [seats, setSeats] = useState([]);

  const initialFormData: Trip = {
    departure_city: "",
    destination_city: "",
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

  const updateSeatStatus = (id: number, price?: number) => {
    const updatedSeats: any = seats.map((innerArray: Seat[]) =>
      innerArray.map((seat) =>
        seat.id === id
          ? { ...seat, isBooked: !seat.isBooked, price: price || 0 }
          : seat
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

  const handleSubmit = () => {
    const filteredSeats: Array<{
      id: number;
      is_driver: boolean;
      price?: number;
    }> = seats
      .flatMap((group: Seat[]) =>
        group.filter((person) => person.isBooked === false)
      )
      .map((person) => ({
        id: person.id,
        is_driver: person.is_driver,
        price: person.price,
      }));

    mutate(
      { ...formData, seats: filteredSeats },
      {
        onSuccess: () => {
          toast.success("Поездка создана успешно");
          setFormData(initialFormData);
          props?.refetch && props?.refetch();
          props.close();
        },
        onError: () => {
          toast.error("Ошибка при создании поездки");
        },
      }
    );
  };

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
            data={mappedCities}
          />
          <Select
            withAsterisk
            label="Куда"
            placeholder="Куда"
            className="w-full"
            onChange={(value) =>
              handleChange("destination_city", String(value))
            }
            value={String(formData.destination_city)}
            data={mappedCities}
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
          label="📦 Посылка"
          checked={formData.is_sending_package_available}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              is_sending_package_available: event.target.checked,
            }))
          }
        />
        <Textarea
          value={formData.description}
          placeholder={`Улица, район отправление \nУлица, район прибитые`}
          label="Описание клиентам"
          className="h-24"
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              description: event.target.value,
            }))
          }
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
              <Input
                min="1"
                type="number"
                className="w-20"
                placeholder="Цена"
                onChange={(e) => {
                  const updatedPrice = Number(e.target.value);
                  setSeats((prevSeats: any) =>
                    prevSeats.map((groupSeats: any, idx: number) =>
                      idx === groupIndex
                        ? groupSeats.map((seat: any) => ({
                            ...seat,
                            price: updatedPrice,
                          }))
                        : groupSeats
                    )
                  );
                }}
                value={group[0]?.price || ""}
              />
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
          onClick={handleSubmit}
          className="bg-dark-blue hover:bg-dark-blue"
        >
          Сохранить
        </Button>
      </Group>
    </Modal>
  );
};
