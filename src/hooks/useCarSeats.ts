import apiClient from '@/hooks/apiClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface SeatDto {
  seat_row: number;
  seat_column: number;
  is_driver_seat?: boolean;
}

interface CreateCarSeatDto {
  seats: SeatDto[];
}

interface Seat {
  id: number;
  is_driver: boolean;
}

// Function to create car seats
const createCarSeats = async (carSeatData: CreateCarSeatDto): Promise<Seat[][]> => {
  const { data } = await apiClient.post('/car-seats', carSeatData);
  return data;
};

// Function to fetch all driver seats grouped by row
const findAllDriverSeats = async (): Promise<Seat[][]> => {
  const { data } = await apiClient.get(`/car-seats`);
  return data;
};

// Custom Hook for creating car seats
export function useCreateCarSeats() {
  const queryClient = useQueryClient();

  return useMutation<Seat[][], Error, CreateCarSeatDto>({
    mutationFn: createCarSeats,
    onSuccess: () => {
      // Invalidate and refetch the car seats query after a successful creation
      queryClient.invalidateQueries({ queryKey: ['carSeats'] });
    },
  });
}

// Custom Hook for fetching all driver seats
export function useFindAllDriverSeats() {
  return useQuery({
    queryKey: ['carSeats'],
    queryFn: () => findAllDriverSeats(),
  });
}