import Hero from "../component/common/Hero";
import FeaturedSection from "../component/product/FeaturedSection";
import GenderCollectionSection from "../component/product/GenderCollection";
import NewArrivals from "../component/product/NewArrivals";
import ProductDetails from "../component/product/ProductDetails";
import ProductGrid from "../component/product/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { fetchBestSeller } from "../api/product.api";

const Home = () => {
  const { data, isLoading, isError, error } = useProducts({
    gender: "Women",
    category: "Bottom Wear",
    limit: 8,
  });


  const { data: bestBellerData } = useQuery({
    queryKey: ["bestSeller"],
    queryFn: fetchBestSeller,
  })

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* best seller */}
      <h2 className="text-center text-3xl font-bold mb-4">Best Seller</h2>
      <ProductDetails productId={bestBellerData?._id}  />

      <div>
        <h2 className="text-center text-3xl font-bold mb-4">
          Top Wear for Women
        </h2>
        <ProductGrid products={data || []} />
        {isLoading && (
          <div className="text-center py-10">Loading products...</div>
        )}

        {isError && <div className="text-red-500">Error: {error?.message}</div>}
      </div>

      <FeaturedSection />
    </div>
  );
};

export default Home;
