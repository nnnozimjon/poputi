import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";

interface VerifyOtp {
    login: string;
    otp: string;
    fullname: string
  }
  
  // Fetch function for cities
  const verifyOtp = async (payload: VerifyOtp) => {
    const { data } = await apiClient.post("users/verify-otp", payload); // No need to write full API URL
    return data;
  };
  
  // Custom Hook
  export function useVerifyOtp() {
    return useMutation({
      mutationFn: verifyOtp,
    });
  }
  