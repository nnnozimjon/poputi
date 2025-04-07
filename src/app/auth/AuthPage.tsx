"use client";

import { Logo } from "@/components/logo/logo";
import { Button, Flex, InputBase, PinInput } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { loginSuccess } from "@/store/slices";
import { useDispatch } from "react-redux";
import { decryptToken } from "@/utils";
import { useSendOtp, useVerifyOtp } from "@/hooks";

export default function AuthPage() {
  const [view, setView] = useState<"auth" | "otp">("auth");
  const [login, setLogin] = useState({ type: "", value: "" });
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  const dispatch = useDispatch();

  const identifyInputType = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+992\d{9}$/; // +992 followed by 9 digits

    if (emailRegex.test(input)) {
      return "email";
    } else if (phoneRegex.test(input)) {
      return "phone_number";
    } else {
      return "invalid";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const type = identifyInputType(value);
    setLogin({ type, value });
  };

  const handleSendOtp = () => {
    setLoading(true);
    identifyInputType(login.value);
    sendOtpMutation.mutate(
      { [login.type]: login?.value },
      {
        onSuccess: (data) => {
          setLoading(false);
          setView("otp");
        },
        onError: (error) => {
          console.error("Failed to send OTP", error);
        },
      }
    );
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    verifyOtpMutation.mutate(
      {
        login: login.value, otp: otpCode,
        fullname: ""
      },
      {
        onSuccess: (data) => {
          setLoading(false);
          setCookie("access_token", data?.token);

          const decryptedData = decryptToken(data.token);

          setTimeout(() => {
            dispatch(loginSuccess(decryptedData));
            window.location.replace("/");
          }, 1000);
        },
        onError: (error) => {
          console.error("OTP verification failed", error);
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
                placeholder={"Email / Номер телефона"}
                className="w-full md:w-[400px]"
                classNames={{
                  input: "h-[50px] rounded-[16px]",
                  section: "p-2",
                }}
                value={login?.value}
                onChange={handleInputChange}
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
              <PinInput
                size="lg"
                length={6}
                onChange={(value) => setOtpCode(value)}
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
