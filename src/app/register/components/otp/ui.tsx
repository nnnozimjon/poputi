import { Button, PinInput, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export const Otp = ({ setOtpCode, resend }: any) => {
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
    resend();
    setCountdown(120);
    setIsResendEnabled(false);
  };

  return (
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

      <PinInput size="lg" length={6} onChange={(value) => setOtpCode(value)} />
    </div>
  );
};
