import apiClient from "@/hooks/apiClient";
import { useMutation } from "@tanstack/react-query";

interface RegisterUserResponse {
  success: number;
  userId: string;
}

interface RegisterPassenger {
  username: string;
  phone_number: string;
}
// This function accepts FormData and sends it to the backend
const registerUser = async (
  formData: FormData
): Promise<RegisterUserResponse> => {
  const { data } = await apiClient.post("users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Required for FormData
    },
  });
  return data;
};

// Custom Hook
export function useUserRegisterQuery() {
  return useMutation({
    mutationFn: registerUser,
  });
}

const registerPassenger = async (body: RegisterPassenger) => {
  const { data } = await apiClient.post("users/register-passenger", body);
  return data;
};

export function usePassengerRegisterQuery() {
  return useMutation({
    mutationFn: registerPassenger,
  });
}

const checkUser = async (phone_number: string) => {
  const { data } = await apiClient.post("users/check-user", { phone_number });
  return data;
};

export function useCheckUser() {
  return useMutation({
    mutationFn: checkUser,
  });
}
