import apiClient from '@/hooks/apiClient';
import { useQuery } from '@tanstack/react-query';

interface CarModel {
  id: number;
  name: string;
}

// Fetch function for car models by brandId
const fetchCarModelsByBrandId = async (brandId: number): Promise<CarModel[]> => {
  const { data } = await apiClient.get(`car-model/by-brand/${brandId}`);
  return data;
};

// Custom Hook
export function useCarModels(brandId: number) {
  return useQuery<CarModel[]>({
    queryKey: ['carModels', brandId], // Unique key for caching
    queryFn: () => fetchCarModelsByBrandId(brandId),
    enabled: !!brandId, // Only fetch if brandId is provided
  });
}