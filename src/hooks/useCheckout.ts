import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface CheckoutItem {
  _id?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CreateCheckoutPayload {
  checkoutItems: CheckoutItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalPrice: number;
}

export interface CheckoutResponse {
  _id: string;
}

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/checkout`;
const config = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
});

export const useCheckout = () => {
  // 1. create Checkout
  const createCheckoutMutation = useMutation<
    CheckoutResponse,
    Error,
    CreateCheckoutPayload
  >({
    mutationFn: async (checkoutData) => {
      const { data } = await axios.post(`${API_URL}`, checkoutData, config());
      return data;
    },
  });

  // 2. update payment status
  const payMutation = useMutation({
mutationFn: async ({ id, details }: { id: string; details: { id: string; status: string } & Record<string, any> }) => {      const { data } = await axios.put(
        `${API_URL}/${id}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        config(),
      );
      return data;
    },
  });

  // 3.
  const finalizeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.post(
        `${API_URL}/${id}/finalize`,
        {},
        config(),
      );
      return data;
    },
  });

  return {
    createCheckout: createCheckoutMutation,
    payOrder: payMutation,
    finalizeOrder: finalizeMutation,
  };
};
