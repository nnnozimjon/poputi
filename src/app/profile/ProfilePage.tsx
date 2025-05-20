"use client";

import { Container } from "@mantine/core";
import {
  UserCar,
  UserDetails,
  UserInfo,
  UserLevel,
  UserPreference,
} from "./components";
import { AvatarImage, CarTopProfileImage } from "@/assets";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div>
      <Image
        src={CarTopProfileImage.src}
        alt="ss"
        width={500}
        height={200}
        className="w-full md:h-full h-[100px] object-cover"
      />
      <Container size={"xl"} className="mb-96">
        <Image
          src={AvatarImage.src}
          alt=""
          width={200}
          height={200}
          className="rounded-full border-4 border-white border-solid -mt-12 size-24  md:-mt-24 md:size-[160px] object-cover"
        />
        {/* <div className="w-full flex items-center justify-end">
          <Button leftSection={<FaEdit />}>Изменить</Button>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-8">
          <UserInfo />
          <UserCar />
          <UserDetails />
          <UserLevel />
          <UserPreference />
        </div>
      </Container>
    </div>
  );
}
