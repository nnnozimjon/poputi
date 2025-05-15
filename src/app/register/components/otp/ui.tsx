import { PinInput, Text } from "@mantine/core";

export const Otp = ({ setOtpCode }: any) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 mt-4">
      <Text className="text-secondary-200">
        Мы отправили вам смс-код для подтверждения
      </Text>
      <PinInput size="lg" length={6} onChange={(value) => setOtpCode(value)} />
    </div>
  );
};
