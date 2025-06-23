"use client";
import { ActionIcon, Button, Flex, InputBase } from "@mantine/core";
import { Otp } from "../components";
import { useCallback, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { formatPhoneNumber } from "@/utils";
import { useCheckUser, usePassengerRegisterQuery, useSendOtp } from "@/hooks";

export default function PassengerRegisterForm() {
  const { mutate, isPending } = usePassengerRegisterQuery();
  const { mutate: sendOtp } = useSendOtp();
  const { mutate: checkUser } = useCheckUser();

  const steps = ["userInfo", "otp"];
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];

  const [otpCode, setOtpCode] = useState<string>("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    phone_number: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const validateStep = () => {
    const data = currentStep;

    switch (data) {
      case "userInfo":
        return userInfo.phone_number && userInfo.username && userInfo.password;
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

    if (userInfo.phone_number.replace(/\s/g, "").length !== 13) {
      toast.warning("Неверный номер телефона");
      return;
    }

    const isLastStep = stepIndex === steps.length - 1;
    if (currentStep === "userInfo") {
      checkUser(userInfo.phone_number, {
        onSuccess: () => {
          setStepIndex(stepIndex + 1);
          sendOtp({ phone_number: userInfo.phone_number, type: 'register' });
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
    try {
      await mutate(userInfo, {
        onSuccess: () => {
          toast.success("Пользователь успешно зарегистрирован");
          window.location.replace("/auth");
        },
      });
    } catch (error: any) {
      toast.warning(error?.response?.data?.message || "Ошибка регистрации");
    }
  }, [mutate, userInfo]);

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
            value={userInfo?.phone_number}
            onChange={(e) =>
              setUserInfo((prev: any) => ({
                ...prev,
                phone_number: formatPhoneNumber(e.target.value),
              }))
            }
          />
          <InputBase
            label="Пароль"
            placeholder={"Пароль"}
            className="w-full md:w-[400px]"
            type={showPassword ? "text" : "password"}
            classNames={{
              input: "h-[50px] rounded-lg",
              section: "p-2",
              label: "text-gray-dark",
            }}
            value={userInfo?.password}
            onChange={(e) =>
              setUserInfo((prev: any) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            rightSection={
              <ActionIcon variant="transparent" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </ActionIcon>
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
          loading={isPending}
          variant="filled"
          className="bg-dark-blue hover:bg-dark-blue h-[40px] w-full"
        >
          Дальше
        </Button>
      </div>
    </Flex>
  );
}
