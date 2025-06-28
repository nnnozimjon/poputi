import apiClient from "@/hooks/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useCreateDcOrder = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post("create-dc-order", {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "text", // Important: DC returns HTML/XML, not JSON
      });
      return data;
    },
  });
};
