import axios from "axios";
import authToken from "../utils/authToken";

type CartData = {
  productId: string;
  size: string;
  color: string | null;
  quantity?: number;
  userId: string | null;
  guestId: string | null;
};

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
});

API.interceptors.request.use((config) => {
  const token = authToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getCartReq = (params: {
  userId?: string | null;
  guestId?: string | null;
}) => API.get("/", { params }).then((res) => res.data);

export const addToCartReq = (data: CartData) =>
  API.post("/", data).then((res) => res.data);

export const updateQuantityReq = (data: CartData) =>
  API.put("/", data).then((res) => res.data);

export const removeFromCartReq = (data: CartData) =>
  API.delete("/", { data }).then((res) => res.data);

export const mergeCartReq = (data: CartData) =>
  API.post("/merge", data).then((res) => res.data);

