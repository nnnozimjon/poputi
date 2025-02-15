import MainImage from "@/assets/beautiful-sky.jpg";
import { Button, Container } from "@mantine/core";
import Image from "next/image";

export const MainPageTopContent = () => {
  return (
    <div className="relative">
      <Image
        width={"4096"}
        height={"2048"}
        className="w-full sm:h-80 h-48 object-cover object-bottom"
        src={MainImage.src}
        alt=""
      />
      
      <div className="absolute top-0 w-full h-full bg-black opacity-40"></div>

      <div className="absolute flex items-center justify-center top-0 w-full h-full">
        <Container size={"xl"} className="text-center grid grid-cols-2">
          <p className="text-white text-3xl font-bold grid-cols-1">
            Сервис для <i className="text-green"> поиска попутчиков </i> и автомобилей для поездок по
            <i className="text-green"> Таджикистан</i>
          </p>
          <div className="grid-cols-1">
          <Button>Something</Button>
          </div>
        </Container>
      </div>
    </div>
  );
};
