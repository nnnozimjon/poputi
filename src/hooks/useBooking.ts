import apiClient from "@/hooks/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BookingPayload {
  trip_id: string;
  seat_ids: number[];
}

interface BookingResponse {
  id: string;
  trip_id: string;
  user_id: string;
  total_price: number;
  status: string;
  created_at: string;
  seats: {
    id: number;
    seat_row: number;
    seat_column: number;
    price: number;
  }[];
}

// API functions
const createBooking = async (payload: BookingPayload): Promise<BookingResponse> => {
  const { data } = await apiClient.post("booking", payload);
  return data;
};

// Custom Hooks
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
}


