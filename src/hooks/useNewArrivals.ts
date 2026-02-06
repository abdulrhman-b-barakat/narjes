import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchNewArrivals = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`,
  );

  return response.data;
};

export const useNewArrivals = () => {
  return useQuery({
    queryKey: ["newArrival"],
    queryFn: fetchNewArrivals,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24, 
    retry: 1, 
    refetchOnWindowFocus: false,
  });
};
