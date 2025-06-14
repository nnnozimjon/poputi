import apiClient from '@/hooks/apiClient';
import { useMutation } from '@tanstack/react-query';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post("/create-order");
      return data;
    },
  });
};
