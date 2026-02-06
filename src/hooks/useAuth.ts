import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCart } from "./useCart";
import getGuestId from "../utils/getGuestId";

type AuthData = {
  name?: string;
  email: string;
  password: string | number;
};
interface AuthPayload {
  data: AuthData;
  path: "login" | "register";
}
const dataRes = async ({ data, path }: AuthPayload) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${path}`,
    data,
  );
  return res.data;
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { mergeCart } = useCart();

  const authMutation = useMutation({
    mutationFn: dataRes,
    onSuccess: async(data) => {
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("userToken", data.token);

      const currentGuestId = getGuestId();
      if (currentGuestId) {
        mergeCart({
          guestId: currentGuestId,
          userId: data.user._id,
          productId: "",
          size: "",
          color: null,
        });
      }

      queryClient.setQueryData(["user"], data.user);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    window.location.href = "/";
    },
  });

  const logout = () => {
    localStorage.clear();

    queryClient.clear();
    window.location.href = "/";
  };

  return {
    authAction: authMutation.mutate,
    isLoading: authMutation.isPending,
    isError: authMutation.isError,
    error: authMutation.error,
    logout,
  };
};
