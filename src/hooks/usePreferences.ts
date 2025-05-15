import apiClient from '@/hooks/apiClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Define preference type
interface Preference {
  id: number;
  name: string;
}

// Fetch function for preferences
const fetchPreferences = async (): Promise<Preference[]> => {
  const { data } = await apiClient.get('/preferences');
  return data;
};

// Custom Hook
export function usePreferences() {
  return useQuery<Preference[]>({
    queryKey: ['preferences'],
    queryFn: fetchPreferences,
  });
}

// Mutation function for creating driver preferences
const createDriverPreferences = async (preferenceIds: number[]) => {
  const { data } = await apiClient.post('/driver-preference', {
    preferenceIds,
  });
  return data;
};

// Fetch function for driver preferences
const getDriverPreferences = async (): Promise<Preference[]> => {
  const { data } = await apiClient.get('/driver-preference');
  return data;
};

// Custom Hook for creating driver preferences
export function useCreateDriverPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDriverPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences'] });
    },
  });
}

// Custom Hook for getting driver preferences
export function useGetDriverPreferences() {
  return useQuery({
    queryKey: ['driver-preferences'],
    queryFn: getDriverPreferences,
  });
}
