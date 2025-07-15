import {
  useCarBodyTypes,
  useCarBrands,
  useCarColors,
  useCarModels,
} from "@/hooks";
import { mapToSelectOptions } from "@/utils";
import { Input, Select } from "@mantine/core";

export const CarDetails = ({ 
  carDetails,
  setCarDetails,
 }:any) => {
  const { data: carBrands } = useCarBrands();
  const { data: carModels } = useCarModels(carDetails.car_brand_id);
  const { data: carBodyTypes } = useCarBodyTypes();
  const { data: carColors } = useCarColors();

  const mappedBrands = mapToSelectOptions(carBrands ?? [], "id", "name");
  const mappedModels = mapToSelectOptions(carModels ?? [], "id", "name");
  const mappedBodyTypes = mapToSelectOptions(carBodyTypes ?? [], "id", "name");
  const mappedColors = mapToSelectOptions(carColors ?? [], "id", "name");

  const handleChange = (key: string, value: string | number) => {
    setCarDetails((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Select
        value={String(carDetails.car_brand_id)}
        data={mappedBrands}
        label="Марка авто"
        placeholder="Не выбрано"
        onChange={(value) => handleChange("car_brand_id", Number(value))}
        className="w-full md:w-[400px]"
        classNames={{
          input: "h-[50px] rounded-lg",
          section: "p-2",
          label: "text-gray-dark",
        }}
      />
      <Select
        disabled={!carDetails.car_brand_id}
        value={String(carDetails.car_model_id)}
        data={mappedModels}
        label="Модель авто"
        placeholder="Не выбрано"
        onChange={(value) => handleChange("car_model_id", Number(value))}
        className="w-full md:w-[400px]"
        classNames={{
          input: "h-[50px] rounded-lg",
          section: "p-2",
          label: "text-gray-dark",
        }}
      />
      <Select
        value={String(carDetails.car_body_type_id)}
        data={mappedBodyTypes}
        label="Тип кузова"
        placeholder="Не выбрано"
        onChange={(value) => handleChange("car_body_type_id", Number(value))}
        className="w-full md:w-[400px]"
        classNames={{
          input: "h-[50px] rounded-lg",
          section: "p-2",
          label: "text-gray-dark",
        }}
      />
      <Select
        value={String(carDetails.car_color_id)}
        data={mappedColors}
        label="Цвет авто"
        placeholder="Не выбрано"
        onChange={(value) => handleChange("car_color_id", Number(value))}
        className="w-full md:w-[400px]"
        classNames={{
          input: "h-[50px] rounded-lg",
          section: "p-2",
          label: "text-gray-dark",
        }}
      />
      <Input.Wrapper
        label="Гос номер"
        error={
          carDetails.plate_number.length > 0 &&
          !/^\d{4}[A-Za-z]{2}\d{2}$/.test(carDetails.plate_number)
            ? "Формат: 4 цифры, 2 буквы, 2 цифры (например, 1234AB56)"
            : undefined
        }
      >
        <Input
          value={carDetails.plate_number}
          onChange={(event) => handleChange("plate_number", event.target.value.toUpperCase())}
          placeholder="1234AB56"
          className="w-full md:w-[400px]"
          classNames={{
            input: "h-[50px] rounded-lg",
            section: "p-2",
          }}
          maxLength={8}
        />
      </Input.Wrapper>
    </div>
  );
};
