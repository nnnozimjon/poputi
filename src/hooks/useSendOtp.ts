import apiClient from "@/hooks/apiClient";
import { useMutation } from "@tanstack/react-query";

interface SendOtp {
  phone_number: string;
  type?: "register" | "login";
}

// Fetch function for cities
const sendOtp = async (payload: SendOtp) => {
  const { data } = await apiClient.post("users/send-otp", payload); // No need to write full API URL
  return data;
};

// Custom Hook
export function useSendOtp() {
  return useMutation({
    mutationFn: sendOtp,
  });
}

