import apiClient from '@/hooks/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export interface CreateOrderDto {
  user_phone: string;
  seat_ids: number[];
  trip_id: string;
  gate: string;
}

const createOrder = async (payload: CreateOrderDto) => {
  const { data } = await apiClient.post("orders/create", payload);
  return data;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};


