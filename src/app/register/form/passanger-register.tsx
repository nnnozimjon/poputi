"use client";
import { ActionIcon, Button, Flex, InputBase } from "@mantine/core";
import { Otp } from "../components";
import { useCallback, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function PassengerRegisterForm() {
  const steps = ["userInfo", "otp"];
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];

  const [otpCode, setOtpCode] = useState<string>("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    phoneNumber: "",
  });

  const validateStep = () => {
    const data = currentStep;

    switch (data) {
      case "userInfo":
        return (
          userInfo.phoneNumber && userInfo.username
        );
      case "otp":
        return otpCode.length === 6;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep()) {
      toast.info("Пожалуйста, заполните все обязательные поля.");
      return;
    }
    const isLastStep = stepIndex === steps.length - 1;
    if (currentStep === "userInfo") {
      // checkUser(userInfo.phoneNumber, {
      //   onSuccess: () => {
      //     setStepIndex(stepIndex + 1);
      // sendOtp({ phone_number: userInfo.phoneNumber });
      //   },
      //   onError: (error) => {
      //     toast.warning(
      //       (error as any).response?.data?.message ||
      //         "Ошибка при проверке пользователя"
      //     );
      //   },
      // });
      return;
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

  const handleSubmit = useCallback(async () => {
    //   const mappedSeats = carSeats.flatMap((group, rowIndex) =>
    //     group.map((seat, columnIndex) => ({
    //       seat_row: rowIndex + 1,
    //       seat_column: columnIndex + 1,
    //       is_driver_seat: seat.isDriver,
    //     }))
    //   );
    //   const createUserForm = new FormData();
    //   createUserForm.append("username", userInfo.username);
    //   createUserForm.append("phone_number", userInfo.phoneNumber);
    //   createUserForm.append("street_address", userInfo.streetAddress);
    //   if (userInfo.croppedImage) {
    //     createUserForm.append("avatar_image", userInfo.croppedImage as Blob);
    //   }
    //   createUserForm.append("car_details", JSON.stringify(carDetails));
    //   createUserForm.append("car_seats", JSON.stringify(mappedSeats));
    //   createUserForm.append("otp_code", otpCode);
    //   try {
    //     await mutateAsync(createUserForm, {
    //       onSuccess: () => {
    //         toast.success("Пользователь успешно зарегистрирован");
    //         window.location.replace("/auth");
    //       },
    //     });
    //   } catch (error: any) {
    //     toast.warning(error?.response?.data?.message || "Ошибка регистрации");
    //   }
  }, []);

  return (
    <Flex
      className="w-full p-4"
      gap={"md"}
      direction={"column"}
      align={"center"}
    >
      {currentStep === "userInfo" && (
        <div className="w-full gap-4 flex flex-col items-center">
          <InputBase
            label="Имя"
            placeholder={"Имя"}
            className="w-full md:w-[400px]"
            classNames={{
              input: "h-[50px] rounded-lg",
              section: "p-2",
              label: "text-gray-dark",
            }}
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo((prev: any) => ({
                ...prev,
                username: e.target.value,
              }))
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
                phoneNumber: e.target.value,
              }))
            }
          />
        </div>
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
          // loading={isPending}
          variant="filled"
          className="bg-dark-blue hover:bg-dark-blue h-[40px] w-full"
        >
          Дальше
        </Button>
      </div>
    </Flex>
  );
}
