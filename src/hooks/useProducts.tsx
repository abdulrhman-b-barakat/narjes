import { useQuery, } from "@tanstack/react-query";
import {
  fetchProductById,
  fetchProducts,
  fetchSmiliarProducts,
} from "../api/product.api";

// fetch Products by using the filters
export const useProducts = (filters: any) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};

// fetch specific product by using the id
export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

// fetch similar products for the details product page
export const useSimilarProducts = (id: string) => {
  return useQuery({
    queryKey: ["similar", id],
    queryFn: () => fetchSmiliarProducts(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};


// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updateProductApi,
//     onSuccess: (updatedProduct) => {
//       queryClient.setQueryData(["product", updatedProduct._id], updatedProduct);
//       queryClient.invalidateQueries(["products"]); 
//     },
//   });
// };
