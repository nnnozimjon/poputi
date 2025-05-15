"use client";

import { Logo } from "@/components/logo/logo";
import { ActionIcon, Button, Flex } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { CarDetails, CarSeats, Otp, UserInfo } from "./components";
import { FaArrowLeft } from "react-icons/fa6";
import { useAppSelector } from "@/store/store";
import { useCheckUser, useSendOtp, useUserRegisterQuery } from "@/hooks";
import { toast } from "react-toastify";

export default function RegistrationPage() {
  const user = useAppSelector((state) => state.user);

  const { mutate } = useUserRegisterQuery();
  const { mutate: sendOtp } = useSendOtp();
  const { mutate: checkUser } = useCheckUser();

  const steps = ["userInfo", "carDetails", "carSeats", "otp"];
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];

  const validateStep = () => {
    const data = currentStep;

    switch (data) {
      case "userInfo":
        return (
          userInfo.phoneNumber && userInfo.username && userInfo.streetAddress
        );
      case "carDetails":
        return (
          carDetails.car_body_type_id &&
          carDetails.car_brand_id &&
          carDetails.car_model_id &&
          carDetails.plate_number &&
          carDetails.car_color_id
        );
      case "carSeats":
        return carSeats.length > 1;
      case "otp":
        return otpCode.length === 6;
      default:
        return false;
    }
  };
  const [userInfo, setUserInfo] = useState({
    username: "",
    phoneNumber: "",
    streetAddress: "",
    croppedImage: null,
  });
  const initialFormData = {
    user_id: user?.user?.id ?? "",
    plate_number: "",
    car_color_id: 0,
    car_body_type_id: 0,
    car_brand_id: 0,
    car_model_id: 0,
  };
  const [carDetails, setCarDetails] = useState(initialFormData);
  const seats = [
    [
      { id: 1, isDriver: true },
      { id: 2, isDriver: false },
    ],
    [
      { id: 3, isDriver: false },
      { id: 4, isDriver: false },
      { id: 5, isDriver: false },
    ],
  ];
  const [carSeats, setCarSeats] = useState(seats);
  const [otpCode, setOtpCode] = useState<string>("");

  const handleNext = () => {
    if (!validateStep()) {
      toast.info("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const isLastStep = stepIndex === steps.length - 1;

    if (currentStep === "userInfo") {
      checkUser(userInfo.phoneNumber, {
        onSuccess: () => {
          setStepIndex(stepIndex + 1);
        },
        onError: (error) => {
          toast.warning(
            (error as any).response?.data?.message ||
              "Ошибка при проверке пользователя"
          );
        },
      });
      return;
    }

    if (currentStep === "carSeats") {
      sendOtp({ phone_number: userInfo.phoneNumber });
    }

    if (isLastStep) {
      handleSubmit();
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleSubmit = () => {
    const mappedSeats = carSeats.flatMap((group, rowIndex) =>
      group.map((seat, columnIndex) => ({
        seat_row: rowIndex + 1,
        seat_column: columnIndex + 1,
        is_driver_seat: seat.isDriver,
      }))
    );

    const createUserForm = new FormData();
    createUserForm.append("username", userInfo.username);
    createUserForm.append("phone_number", userInfo.phoneNumber);
    createUserForm.append("street_address", userInfo.streetAddress);

    if (userInfo.croppedImage) {
      createUserForm.append("avatar_image", userInfo.croppedImage as Blob);
    }

    createUserForm.append("car_details", JSON.stringify(carDetails));
    createUserForm.append("car_seats", JSON.stringify(mappedSeats));
    createUserForm.append("otp_code", otpCode);

    mutate(createUserForm, {
      onSuccess: () => {
        toast.success("Пользователь успешно зарегистрирован");
        window.location.replace("/auth");
      },
      onError: (error) => {
        toast.warning((error as any).response.data?.message);
      },
    });
  };

  return (
    <div className="py-32 overflow-hidden scrollbar-hide">
      <Flex direction={"column"} className="w-full" align={"center"}>
        <svg
          width={150}
          height={150}
          viewBox="0 0 380 317"
          className="text-main"
        >
          <Logo />
        </svg>
        <Flex
          className="w-full px-4"
          gap={"md"}
          direction={"column"}
          align={"center"}
        >
          {currentStep === "userInfo" && (
            <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
          )}
          {currentStep === "carDetails" && (
            <CarDetails carDetails={carDetails} setCarDetails={setCarDetails} />
          )}
          {currentStep === "carSeats" && (
            <CarSeats carSeats={carSeats} setCarSeats={setCarSeats} />
          )}
          {currentStep === "otp" && (
            <Otp otpCode={otpCode} setOtpCode={setOtpCode} />
          )}

          <div className="flex gap-2 items-center w-full md:w-[400px]">
            {currentStep !== "userInfo" && (
              <ActionIcon
                onClick={handleBack}
                className="bg-dark-blue hover:bg-dark-blue size-[40px] shrink-0"
              >
                <FaArrowLeft />
              </ActionIcon>
            )}

            <Button
              onClick={handleNext}
              variant="filled"
              className="bg-dark-blue hover:bg-dark-blue h-[40px] w-full"
            >
              Дальше
            </Button>
          </div>

          <div className="flex gap-2">
            <p className="text-center select-none">Есть аккаунта? </p>
            <Link
              href={"/auth"}
              className="text-dark-blue cursor-pointer no-underline font-medium"
            >
              Войти
            </Link>
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
