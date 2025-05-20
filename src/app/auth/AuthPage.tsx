"use client";

import { Logo } from "@/components/logo/logo";
import { Button, Flex, InputBase, PinInput, Text } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { useSendOtp, useUserLogin } from "@/hooks";
import { decryptToken, formatPhoneNumber } from "@/utils";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices";
import { toast } from "react-toastify";

export default function AuthPage() {
  const [view, setView] = useState<"auth" | "otp">("auth");
  const [loginForm, setLoginForm] = useState({
    phone_number: "",
    otp_code: "",
  });

  const [countdown, setCountdown] = useState(120);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    if (countdown === 0) {
      setIsResendEnabled(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = () => {
    if (!isResendEnabled) return;
    handleSendOtp();
    setCountdown(120);
    setIsResendEnabled(false);
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const sendOtpMutation = useSendOtp();
  const { mutate: loginUser } = useUserLogin();

  const handleSendOtp = () => {
    setLoading(true);
    sendOtpMutation.mutate(
      { phone_number: loginForm.phone_number, type: "login" },
      {
        onSuccess: () => {
          setLoading(false);
          setView("otp");
        },
        onError: (error) => {
          setLoading(false);
          toast.warning((error as any).response.data?.message);
        },
      }
    );
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    loginUser(
      {
        phone_number: loginForm.phone_number,
        otp_code: loginForm.otp_code,
      },
      {
        onSuccess: (data) => {
          setLoading(false);
          setCookie("access_token", data?.token, {
            maxAge: 60 * 60 * 24 * 365,
          });
          const decryptedData = decryptToken(data.token);

          setTimeout(() => {
            dispatch(loginSuccess(decryptedData));
            window.location.replace("/");
          }, 1000);
        },
        onError: (error) => {
          toast.warning((error as any).response.data?.message);
        },
      }
    );
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
          {view === "auth" && (
            <div className="w-full gap-4 flex flex-col items-center">
              <InputBase
                placeholder={"Номер телефона"}
                className="w-full md:w-[400px]"
                classNames={{
                  input: "h-[50px] rounded-[16px]",
                  section: "p-2",
                }}
                value={loginForm.phone_number}
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    phone_number: formatPhoneNumber(e.target.value),
                  })
                }
              />
              <Button
                onClick={handleSendOtp}
                variant="filled"
                className="bg-dark-blue hover:bg-dark-blue w-full md:w-[400px]"
                loading={loading}
              >
                Войти
              </Button>
            </div>
          )}
          {view === "otp" && (
            <div className="w-full flex flex-col items-center gap-4 mt-4">
              <Text className="text-secondary-200 my-0 py-0">
                Мы отправили вам смс-код для подтверждения
              </Text>

              <Button
                variant="transparent"
                className="my-0"
                onClick={handleResend}
                disabled={!isResendEnabled}
              >
                {isResendEnabled
                  ? "Отправить еще раз"
                  : `Отправить еще раз (${countdown}s)`}
              </Button>

              <PinInput
                size="lg"
                length={6}
                onChange={(value) =>
                  setLoginForm({ ...loginForm, otp_code: value })
                }
              />
              <Button
                onClick={handleVerifyOtp}
                variant="filled"
                className="bg-dark-blue hover:bg-dark-blue w-full md:w-[400px]"
              >
                Войти
              </Button>
            </div>
          )}

          <div className="flex gap-2">
            <p className="text-center select-none">Нет аккаунта? </p>
            <Link
              href={"/register"}
              className="text-dark-blue cursor-pointer no-underline font-medium"
            >
              Зарегистрироваться
            </Link>
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
