import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCartReq,
  addToCartReq,
  updateQuantityReq,
  removeFromCartReq,
  mergeCartReq,
} from "../api/cart.api";

export const useCart = () => {
  const queryClient = useQueryClient();
  const guestId = localStorage.getItem("guestId");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const userId = userInfo?._id;

  //  fetch cart items
  const cartQuery = useQuery({
    queryKey: ["cart", userId, guestId],
    queryFn: () => getCartReq({ userId, guestId }),
    enabled: !!(userId || guestId),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  // (Add/Update/Delete)
  const invalidateCart = () => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };
  // add to cart
  const addMutation = useMutation({
    mutationFn: addToCartReq,
    onSuccess: invalidateCart,
  });

  // 3. update quantity of cart item
  const updateMutation = useMutation({
    mutationFn: updateQuantityReq,
    onSuccess: invalidateCart,
  });

  // 4. delete cart Item
  const removeMutation = useMutation({
    mutationFn: removeFromCartReq,
    onSuccess: invalidateCart,
  });

  // 5. merge cart
  const mergeMutation = useMutation({
    mutationFn: mergeCartReq,
    onSuccess: invalidateCart,
  });

  return {
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,
    error: cartQuery.error?.message,
    addToCart: addMutation.mutate,
    updateQuantity: updateMutation.mutate,
    removeFromCart: removeMutation,
    mergeCart: mergeMutation.mutate,
    isAdding: addMutation.isPending,
  };
};

