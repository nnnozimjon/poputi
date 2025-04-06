import apiClient from "@/hooks/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Types for your trip operations
interface CreateTripPayload {
  departure_city: string;
  destination_city: string;
  departure_time: Date | null;
  destination_time: Date | null;
  is_sending_package_available?: boolean;
  description?: string;
  seats: Array<{
    id: number;
    is_driver: boolean;
    price?: number;
  }>;
}

interface CarSeat {
  id: number;
  seat_row: number;
  seat_column: number;
  is_driver_seat: boolean;
  is_booked: boolean;
  price: string | number;
}

interface Trip {
  id: string;
  driver_id: string;
  departure_city: string;
  destination_city: string;
  departure_time: string;
  destination_time: string;
  is_sending_package_available: boolean;
  description: string;
  status: string;
  created_at: string;
  driver: {
    user_fullname: string;
    car_model: string;
    car_brand: string;
  };
  car_seats: CarSeat[];
}

interface TripApiResponse {
  data: Trip[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

// API functions
const createTrip = async (payload: CreateTripPayload) => {
  const { data } = await apiClient.post("trips", payload);
  return data;
};

const getTrips = async (
  params?: Record<string, any>
): Promise<TripApiResponse> => {
  const { data } = await apiClient.get("trips", { params });
  return data;
};

const getTripById = async (id: string): Promise<Trip> => {
  const { data } = await apiClient.get(`trips/${id}`);
  return data;
};

// Custom Hooks
export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
}

export function useGetTrips(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["trips", params],
    queryFn: () => getTrips(params),
  });
}

export function useGetTripById(id: string) {
  return useQuery({
    queryKey: ["trip", id],
    queryFn: () => getTripById(id),
    enabled: !!id,
  });
}

