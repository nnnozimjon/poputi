import apiClient from '@/hooks/apiClient';
import { useQuery } from '@tanstack/react-query';

interface CarBrand {
  id: number;
  name: string;
}

// Fetch function for car brands
const fetchCarBrands = async (): Promise<CarBrand[]> => {
  const { data } = await apiClient.get('/car-brand');
  return data;
};

// Custom Hook
export function useCarBrands() {
  return useQuery<CarBrand[]>({
    queryKey: ['carBrands'], // Unique key for caching
    queryFn: fetchCarBrands,
  });
}