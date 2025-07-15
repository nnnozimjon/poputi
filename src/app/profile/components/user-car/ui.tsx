import { FaCarRear, FaCamera } from "react-icons/fa6";
import { LabeledContainer } from "../container";
import { Text, Button } from "@mantine/core";
import { useAppSelector } from "@/store/store";
import { useDriverDetails } from "@/hooks/useDriverDetails";
import Image from "next/image";
import { CarPlaceholderImage } from "@/assets";
import { useState } from "react";
import { CarImagesUploadModal } from "@/modals";
import { toast } from "react-toastify";
import { usePostDriverImages } from "@/hooks/useDriver";

export const UserCar = () => {
  const user = useAppSelector((state) => state.user);
  const isDriver = user.isDriver;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useDriverDetails(isDriver);

  const { mutate: postDriverImages } = usePostDriverImages();

  const handleImagesUpload = (images: File[]) => {
    postDriverImages(images, {
      onSuccess: () => {
        toast.success(`Загружено ${images.length} изображений`);
      },
      onError: () => {
        toast.error('Ошибка при загрузке изображений');
      }
    });
  };

  return (
    <LabeledContainer
      label={"Инфо об авто"}
      className="col-span-full md:col-span-4 h-fit"
      icon={<FaCarRear className="text-secondary-200" />}
    >
      <div>
        <Text className="text-sm mb-2 text-secondary-200">Текущий автомобиль</Text>
        
        <Button
          leftSection={<FaCamera />}
          variant="outline"
          size="sm"
          className="w-full mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Загрузить изображения автомобиля
        </Button>
        
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
      <CarImagesUploadModal
        opened={isModalOpen}
        close={() => setIsModalOpen(false)}
        onImagesUpload={handleImagesUpload}
      />
    </LabeledContainer>
  );
};
