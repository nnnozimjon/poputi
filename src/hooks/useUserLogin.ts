import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";

interface loginUserBody {
    phone_number: string;
    otp_code: string;
}

const loginUserBody = async (body: loginUserBody) => {
    const { data } = await apiClient.post("users/login", body);
    return data;
  };
  
  export function useUserLogin() {
    return useMutation({
      mutationFn: loginUserBody,
    });
  }
  