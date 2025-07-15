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
import { useGetUserInfoQuery } from "@/hooks";

export default function ProfilePage() {
  const { data: userInfo } = useGetUserInfoQuery();

  return (
    <div>
      <Image
        src={CarTopProfileImage.src}
        alt="top_profile_image"
        width={500}
        height={200}
        className="w-full md:h-full h-[100px] object-cover"
      />
      <Container size={"xl"} className="mb-96">
        <Image
          src={userInfo?.avatar_image || AvatarImage.src}
          alt="user_avatar"
          width={200}
          height={200}
          className="rounded-full border-4 border-white border-solid -mt-12 size-24  md:-mt-24 md:size-[160px] object-cover"
        />
        {/* <div className="w-full flex items-center justify-end">
          <Button leftSection={<FaEdit />}>Изменить</Button>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-8">
          <UserInfo user={userInfo}/>
          <UserCar />
          <UserDetails />
          <UserLevel />
          <UserPreference />
        </div>
      </Container>
    </div>
  );
}
