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
const createCarSeats = async (carSeatData: CreateCarSeatDto): Promise<{carSeats: Seat[][], token: string}> => {
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

  return useMutation<{ carSeats: Seat[][], token: string }, Error, CreateCarSeatDto>({
    mutationFn: createCarSeats,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carSeats'] });
    },
  });
}

// Custom Hook for fetching all driver seats
export function useFindAllDriverSeats(isAuthed: boolean) {
  return useQuery({
    queryKey: ['carSeats'],
    queryFn: () => findAllDriverSeats(),
    enabled: isAuthed
  });
}