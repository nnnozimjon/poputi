"use client";

import { Container } from "@mantine/core";
import {
  UserCar,
  UserDetails,
  UserInfo,
  UserLevel,
  UserPreference,
} from "./components";

export default function ProfilePage() {
  return (
    <Container size={"xl"} className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <UserInfo />
        <UserLevel />
        <UserCar />
        <UserDetails />
        <UserPreference />
      </div>
    </Container>
  );
}
