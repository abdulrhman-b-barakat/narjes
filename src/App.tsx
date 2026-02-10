import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./pages/Shoping/Products";
import Home from "./pages/Home";
import RootLayout from "./component/layout/RootLayout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/Profile";
import ProductDetails from "./component/product/ProductDetails";
import Checkout from "./component/cart/Checkout";
// import OrderDetailsPage from "./pages/OrderDetailsPage";
import AdminLayout from "./component/admin/AdminLayout";
import AdminHomePage from "./pages/admin/AdminHomePage";
import UserManagement from "./pages/admin/UserManagement";
import ProductManagement from "./pages/admin/ProductManagment";
import EditProductPage from "./pages/admin/EditProductPage";
import OrderManagement from "./pages/admin/OrderManagement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./component/ProtectedRoute";
import { fetchProducts } from "./api/product.api";

const App = () => {
  const queryClient = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "/",
      id: "rootLayout",
      element: <RootLayout />,
      children: [
        { index: true, id: "home", element: <Home /> },

        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },

        
        {
          path: "/products",
          id: "products",
          element: <Products />,
        },
        {
          path: "/products/:id",
          element: <ProductDetails />,
          loader: async ({ params }) => {
            const { id } = params;

            if (!id) {
              throw new Response("Collection ID is missing", { status: 400 });
            }

            return await queryClient.ensureQueryData({
              queryKey: ["product", id],
              queryFn: () => fetchProducts(id),
            });
          },
        },

        {
          path: "/checkout",
          element: <ProtectedRoute />,
          children: [{ index: true, element: <Checkout /> }],
        },

        {
          path: "/profile",
          element: <ProtectedRoute />,
          children: [{ index: true, element: <Profile /> }],
        },
        // { path: "/profile/orderdetails/:id", element: <OrderDetailsPage /> },
      ],
    },
    {
      path: "/admin",
      id: "admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminHomePage /> },
        { path: "users", element: <UserManagement /> },
        { path: "products", element: <ProductManagement /> },
        { path: "products/:id/edit", element: <EditProductPage /> },
        { path: "orders", element: <OrderManagement /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
};

export default App;
