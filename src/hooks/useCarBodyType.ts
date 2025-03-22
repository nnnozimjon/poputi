import apiClient from '@/hooks/apiClient';
import { useQuery } from '@tanstack/react-query';

interface CarBodyType {
  id: number;
  name: string;
}

// Fetch function for car body types
const fetchCarBodyTypes = async (): Promise<CarBodyType[]> => {
  const { data } = await apiClient.get('/car-body-type');
  return data;
};

// Custom Hook
export function useCarBodyTypes() {
  return useQuery<CarBodyType[]>({
    queryKey: ['carBodyTypes'], // Unique key for caching
    queryFn: fetchCarBodyTypes,
  });
}