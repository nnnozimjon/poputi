import { Card, Text, Grid, Container, Button } from "@mantine/core";
import Image from "next/image";
import busImage from "@/assets/bus.svg";
import carImage from "@/assets/car.svg";

export const VehicleTypes = () => {
  return (
    <Container size={"xl"} className="py-8">
      <Text className="text-2xl font-bold mb-6 text-center text-dark-blue">Выберите тип транспорта</Text>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card className="h-full">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative w-full max-w-[300px] h-[200px]">
                <Image
                  src={busImage}
                  alt="Bus"
                  fill
                  className="object-contain"
                />
              </div>
              <Text className="text-xl font-semibold text-main">Автобус</Text>
              <Text className="text-secondary-200 text-lg">
                Комфортабельные автобусы с кондиционером и удобными сиденьями.
                Идеально подходит для групповых поездок и дальних маршрутов.
              </Text>
            </div>
            <Button className="w-full bg-main text-white my-8">Перейти</Button>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card className="h-full">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative w-full max-w-[300px] h-[200px]">
                <Image
                  src={carImage}
                  alt="Car"
                  fill
                  className="object-contain"
                />
              </div>
              <Text className="text-xl font-semibold text-main">Легковой автомобиль</Text>
              <Text className="text-secondary-200 text-lg">
                Удобные автомобили для быстрых поездок.
                Подходит для небольших групп и коротких маршрутов.
              </Text>
            </div>
            <Button className="w-full bg-main text-white my-8">Перейти</Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}; 