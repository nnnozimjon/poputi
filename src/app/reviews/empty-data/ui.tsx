import { Button, Text } from "@mantine/core";
import { EmptyReviewIcon } from "@/assets";
import Image from "next/image";

export const EmptyReviewPage = () => {
  return (
    <div className="flex flex-col items-center mb-96">
      <Image src={EmptyReviewIcon} alt="" width={400} height={300} />

      <div className="flex flex-col gap-4 items-center">
        <Text className="text-3xl font-bold text-center">
          Станьте первым, кто оставит отзыв!
        </Text>
        <Text className="text-[16px] text-secondary-200 text-center">
          Пока здесь нет отзывов от пассажиры. Поделитесь своим опытом и
          помогите развитию нашего сообщества!
        </Text>
        <Button variant="outline" className="w-fit text-main border-main hover:text-main active:text-main">Оставить отзыв</Button>
      </div>
    </div>
  );
};
