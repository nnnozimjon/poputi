import ImageCropper from "@/components/image-cropper/image-cropper";
import { Button, InputBase } from "@mantine/core";
import { AvatarImage } from "@/assets";
import Image from "next/image";
import { formatPhoneNumber } from "@/utils";

export const UserInfo = ({ userInfo, setUserInfo, withImage = true }: any) => {
  return (
    <div className="w-full gap-4 flex flex-col items-center">
      {withImage && (
        <div className="flex flex-col items-center gap-4">
          <Image
            src={userInfo.croppedImage || AvatarImage.src}
            width="100"
            height="100"
            className="rounded-full bg-secondary-100"
            alt=""
          />
          <ImageCropper
            onChange={(img) =>
              setUserInfo((prev: any) => ({ ...prev, croppedImage: img }))
            }
            component={(props) => (
              <Button {...props} variant="light" color="blue">
                Upload Image
              </Button>
            )}
          />
        </div>
      )}
      <InputBase
        label="ФИО"
        placeholder={"ФИО"}
        className="w-full md:w-[400px]"
        classNames={{
          input: "h-[50px] rounded-lg",
          section: "p-2",
          label: "text-gray-dark",
        }}
        value={userInfo.username}
        onChange={(e) =>
          setUserInfo((prev: any) => ({ ...prev, username: e.target.value }))
        }
      />
      <InputBase
        label="Номер телефона"
        placeholder={"Номер телефона"}
        className="w-full md:w-[400px]"
        classNames={{
          input: "h-[50px] rounded-lg",
          section: "p-2",
          label: "text-gray-dark",
        }}
        value={userInfo?.phoneNumber}
        onChange={(e) =>
          setUserInfo((prev: any) => ({
            ...prev,
            phoneNumber: formatPhoneNumber(e.target.value),
          }))
        }
      />
      <InputBase
        label="Адрес"
        placeholder={"Адрес"}
        className="w-full md:w-[400px]"
        classNames={{
          input: "h-[50px] rounded-lg",
          section: "p-2",
          label: "text-gray-dark",
        }}
        value={userInfo?.streetAddress}
        onChange={(e) =>
          setUserInfo((prev: any) => ({
            ...prev,
            streetAddress: e.target.value,
          }))
        }
      />
    </div>
  );
};
