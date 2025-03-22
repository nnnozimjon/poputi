import apiClient from '@/hooks/apiClient';
import { useQuery } from '@tanstack/react-query';

// Define the DriverDetails interface
interface DriverDetails {
  user_id: string;
  plate_number: string;
  car_color: string | null;
  car_body_type: string | null;
  car_brand: string | null;
  car_model: string | null;
}

// Fetch function for driver details
const fetchDriverDetails = async (): Promise<DriverDetails> => {
  const { data } = await apiClient.get(`/drivers/vehicle-details`); // Adjust the endpoint as needed
  return data;
};

// Custom Hook
export function useDriverDetails(is_driver: boolean) {
  return useQuery<DriverDetails>({
    queryKey: ['driverDetails', is_driver], // Include user_id in the query key for caching
    queryFn: () => fetchDriverDetails(),
    enabled: !!is_driver, // Only fetch data if user_id is provided
  });
}