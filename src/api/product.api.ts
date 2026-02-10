import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/products`;

export const fetchProducts = async (filters: any) => {
  const query = new URLSearchParams(filters);
  const { data } = await axios.get(`${API_URL}?${query.toString()}`);
  return data;
};

export const fetchProductById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

// export const updateProductApi = async ({ id, productData }) => {
//   const { data } = await axios.put(`${API_URL}/${id}`, productData, {
//     headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
//   });
//   return data;
// };

// fetch best seller
export const fetchBestSeller = async () => {
  const { data } = await axios.get(`${API_URL}/best-seller`);
  return data;
};

// fetch similar products for the details product page
export const fetchSmiliarProducts = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/similar/${id}`);
  return data;
};
