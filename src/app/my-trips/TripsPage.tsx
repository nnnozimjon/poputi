'use client'

import { useAppSelector } from "@/store/store";
import { MyTripsPage } from "./MyTripsPage";
import { MyTripsPassangerPage } from "./MyTripsPassangerPage";

export function TripsPage() {
    const user = useAppSelector((state) => state.user);
    const isDriver = user.isDriver;
    return isDriver ? <MyTripsPage /> : <MyTripsPassangerPage />;
}