import apiClient from '@/hooks/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateDriverDto {
  user_id: string;
  plate_number: string;
  car_color_id: number;
  car_body_type_id: number;
  car_brand_id: number;
  car_model_id: number;
}

interface Driver {
  user_id: string;
  plate_number: string;
  car_color_id: number;
  car_body_type_id: number;
  car_brand_id: number;
  car_model_id: number;
}

// Function to create a new driver
const createDriver = async (driverData: CreateDriverDto): Promise<{driver: Driver, token: string}> => {
  const { data } = await apiClient.post('/drivers', driverData);
  return data;
};

const updateDriver = async (driverData: CreateDriverDto): Promise<{driver: Driver, token: string}> => {
  const { data } = await apiClient.put('/drivers/update', driverData);
  return data;
};  

// Custom Hook
export function useDriver() {
  const queryClient = useQueryClient();

  return useMutation<{driver: Driver, token: string}, Error, CreateDriverDto>({
    mutationFn: createDriver,
    onSuccess: () => {
      // Invalidate and refetch the drivers query after a successful creation
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
  });
}

export function useUpdateDriver() {
  const queryClient = useQueryClient();

  return useMutation<{driver: Driver, token: string}, Error, CreateDriverDto>({
    mutationFn: updateDriver,
    onSuccess: () => {
      // Invalidate and refetch the drivers query after a successful creation
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
  });
}   