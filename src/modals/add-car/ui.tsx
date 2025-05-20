"use client";

import {
  useCarBodyTypes,
  useCarBrands,
  useCarColors,
  useCarModels,
  useDriver,
} from "@/hooks";
import { loginSuccess } from "@/store/slices";
import { useAppSelector } from "@/store/store";
import { decryptToken, mapToSelectOptions } from "@/utils";
import { Button, Group, Input, Modal, Select } from "@mantine/core";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface Props {
  opened: boolean;
  close: () => void;
}

export const AddCarModal = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialFormData = {
    user_id: user?.user?.id ?? "",
    plate_number: "",
    car_color_id: 0,
    car_body_type_id: 0,
    car_brand_id: 0,
    car_model_id: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const isFormValid = (formData: typeof initialFormData): boolean => {
    return (
      formData.user_id !== "" &&
      formData.plate_number !== "" &&
      formData.car_color_id > 0 &&
      formData.car_body_type_id > 0 &&
      formData.car_brand_id > 0 &&
      formData.car_model_id > 0
    );
  };

  const { data: carBrands } = useCarBrands();
  const { data: carModels } = useCarModels(formData.car_brand_id);
  const { data: carBodyTypes } = useCarBodyTypes();
  const { data: carColors } = useCarColors();
  const { mutate, isPending } = useDriver();

  const mappedBrands = mapToSelectOptions(carBrands ?? [], "id", "name");
  const mappedModels = mapToSelectOptions(carModels ?? [], "id", "name");
  const mappedBodyTypes = mapToSelectOptions(carBodyTypes ?? [], "id", "name");
  const mappedColors = mapToSelectOptions(carColors ?? [], "id", "name");

  const handleChange = (key: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data) => {
        toast.success("Автомобиль добавлен успешно");
        setCookie("access_token", data?.token, {
          maxAge: 60 * 60 * 24 * 365,
        });
        const decryptedData = decryptToken(data.token);

        setTimeout(() => {
          dispatch(loginSuccess(decryptedData));
          window.location.replace("/profile");
        }, 1000);
        cancelModal();
      },
      onError: (error) => {
        toast.warning((error as any).response.data?.message);
      },
    });
  };

  const cancelModal = () => {
    setFormData(initialFormData);
    props.close();
  };

  return (
    <Modal
      centered
      opened={props.opened}
      onClose={props.close}
      title="Добавление данные авто"
      size={"lg"}
      closeOnClickOutside={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <div className="flex flex-col gap-4">
        <Select
          value={String(formData.car_brand_id)}
          data={mappedBrands}
          label="Марка авто"
          placeholder="Не выбрано"
          onChange={(value) => handleChange("car_brand_id", Number(value))}
        />
        <Select
          disabled={!formData.car_brand_id}
          value={String(formData.car_model_id)}
          data={mappedModels}
          label="Модель авто"
          placeholder="Не выбрано"
          onChange={(value) => handleChange("car_model_id", Number(value))}
        />
        <Select
          value={String(formData.car_body_type_id)}
          data={mappedBodyTypes}
          label="Тип кузова"
          placeholder="Не выбрано"
          onChange={(value) => handleChange("car_body_type_id", Number(value))}
        />
        <Select
          value={String(formData.car_color_id)}
          data={mappedColors}
          label="Цвет авто"
          placeholder="Не выбрано"
          onChange={(value) => handleChange("car_color_id", Number(value))}
        />
        <Input.Wrapper label="Гос номер">
          <Input
            value={formData.plate_number}
            onChange={(event) =>
              handleChange("plate_number", event.target.value)
            }
            placeholder="Гос номер"
          />
        </Input.Wrapper>
      </div>

      <Group mt="lg" justify="flex-end">
        <Button onClick={cancelModal} variant="default">
          Отменить
        </Button>
        <Button
          disabled={!isFormValid(formData)}
          loading={isPending}
          onClick={handleSubmit}
          className="bg-dark-blue hover:bg-dark-blue"
        >
          Сохранить
        </Button>
      </Group>
    </Modal>
  );
};
