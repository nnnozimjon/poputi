import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";

const getUserInfoQuery = async (): Promise<any> => {
    const { data } = await apiClient.get("users/get-user-info");
    return data;
  };
  
  export function useGetUserInfoQuery() {
    return useQuery({
      queryKey: ["users/get-user-info"],
      queryFn: () => getUserInfoQuery(),
    });
  }