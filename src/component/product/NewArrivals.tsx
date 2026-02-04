import { Link } from "react-router-dom";
import NewArrivalsSkeleton from "./NewArrivalsSkeleton";
import { useNewArrivals } from "../../hooks/useNewArrivals";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: ProductImage[];
}

const NewArrivals = () => {
  const { data, isLoading, isError, error } = useNewArrivals();

  return (
    <section>
      <div className=" container text-center mb-15">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straiht off the ruway, freshly added to
          keep your wardrobe on the cutting edge of of fashion
        </p>

        {isLoading ? (
          <NewArrivalsSkeleton />
        ) : isError ? (
            <p className="text-red-500">
              {error.message}
          </p>
        ) : (
          <div className=" container mx-auto overflow-x-scroll flex space-x-6 relative">
            {data?.map((item : Product) => (
              <div
                key={item._id}
                className="rounded-lg overflow-hidden min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
              >
                <img
                  src={item.images[0]?.url}
                  alt={item.images[0].altText || item.name}
                  className="w-full h-[500] object-cover"
                />
                <div className=" absolute bottom-0 left-0 backdrop-blur-md bg-opacity- text-white p-4 w-full">
                  <Link to={`/product/${item._id}`} className=" block">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="mt-1">{item.price}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* scrollable content */}
      </div>
    </section>
  );
};

export default NewArrivals;
