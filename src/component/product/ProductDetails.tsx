import { useState } from "react";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useProductDetails, useSimilarProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import getGuestId from "../../utils/getGuestId";

const ProductDetails = ({ productId }: { productId?: string }) => {
  const { id: urlId } = useParams();
  const productIdActive = productId || urlId;

  // Hooks
  const {
    data: product,
    isLoading,
    isError,
  } = useProductDetails(productIdActive!);

  const { data: similarProducts, isLoading: isLoadingSimilar } =
    useSimilarProducts(productIdActive!);

  const { addToCart, isAdding } = useCart();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const userId = userInfo?._id;
  const guestId = getGuestId();

  // States
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Loading & Error State
  if (isLoading) {
    return (
      <div className="p-20 text-center text-xl">Loading Product Details...</div>
    );
  }

  if (isError || !product) {
    return (
      <div className="p-20 text-center text-red-500">Product not found.</div>
    );
  }

  const currentMainImage = mainImage || product.images?.[0]?.url;
  const currentColor = selectedColor || product.colors?.[0];
  const currentSize = selectedSize || product.sizes?.[0];

  // Handlers
  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!productIdActive) return;

    addToCart({
      productId: productIdActive,
      size: currentSize,
      color: currentColor,
      quantity,
      userId,
      guestId,
    });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
        <div className="flex gap-4">
          <div className="hidden sm:flex flex-col gap-4">
            {product.images?.map((img: ProductImage, index: number) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText || product.name}
                onClick={() => setMainImage(img.url)}
                className={`w-20 h-24 rounded-md object-cover cursor-pointer border-2 transition ${
                  currentMainImage === img.url
                    ? "border-black"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>

          {/* main image */}
          <div className="flex-1">
            <img
              src={currentMainImage}
              alt="Selected"
              className="w-full h-auto max-h-[600px] rounded-xl object-cover shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-semibold text-gray-800">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* colors */}
          <div className="mb-6">
            <span className="block text-sm font-bold uppercase text-gray-500 mb-3">
              Color:
            </span>
            <div className="flex gap-3">
              {product.colors?.map((color: string) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border border-gray-200 transition ${
                    currentColor === color
                      ? "ring-2 ring-offset-1 ring-black"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* sizes */}
          <div className="mb-8">
            <span className="block text-sm font-bold uppercase text-gray-500 mb-3">
              Size:
            </span>
            <div className="flex gap-2">
              {product.sizes?.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex items-center justify-center border rounded-md font-medium transition ${
                    currentSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* quantity */}
          <div className="mb-8">
            <span className="block text-sm font-bold uppercase text-gray-500 mb-3">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-200 rounded-md w-fit">
              <button
                onClick={() => handleQuantity("dec")}
                className="px-4 py-2 hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantity("inc")}
                className="px-4 py-2 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 mb-12">
            <h3 className="text-lg font-bold mb-4 text-gray-900">
              Characteristics:
            </h3>
            <div className="space-y-3">
              <div className="flex max-w-xs">
                <span className="w-1/2 text-gray-500 font-medium">Brand</span>
                <span className="w-1/2 text-gray-900 font-semibold">
                  {product.brand}
                </span>
              </div>
              <div className="flex max-w-xs">
                <span className="w-1/2 text-gray-500 font-medium">
                  Material
                </span>
                <span className="w-1/2 text-gray-900 font-semibold">
                  {product.material}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-black text-white py-4 rounded-md font-bold transition active:scale-[0.98] mb-10"
          >
            {isAdding ? "adding..." : "ADD TO CART"}
          </button>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl text-center font-medium mb-8">
          You May Also Like
        </h2>
        <ProductGrid products={similarProducts || []} />
        {isLoadingSimilar && (
          <div className="p-20 text-center text-xl">
            Loading Product Details...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
