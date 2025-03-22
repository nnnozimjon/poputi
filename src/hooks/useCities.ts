import apiClient from '@/hooks/apiClient'
import { useQuery } from '@tanstack/react-query'


interface City {
  id: number;
  name: string;
}

// Fetch function for cities
const fetchCities = async (): Promise<City[]> => {
  const { data } = await apiClient.get('/cities') // No need to write full API URL
  return data
}

// Custom Hook
export function useCities() {
  return useQuery<City[]>({
    queryKey: ['cities'],
    queryFn: fetchCities,
  })
}
