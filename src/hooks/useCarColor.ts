import apiClient from '@/hooks/apiClient';
import { useQuery } from '@tanstack/react-query';

interface CarColor {
  id: number;
  name: string;
}

// Fetch function for car colors
const fetchCarColors = async (): Promise<CarColor[]> => {
  const { data } = await apiClient.get('/car-color'); // Fetch from the API endpoint
  return data;
};

// Custom Hook
export function useCarColors() {
  return useQuery<CarColor[]>({
    queryKey: ['carColors'], // Unique key for caching
    queryFn: fetchCarColors, // Function to fetch data
  });
}