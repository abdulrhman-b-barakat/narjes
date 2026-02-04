
export interface CartProduct {
  productId: string;
  name: number;
  image: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
}

export interface CartResponse {
  _id: string;
  guestId: string;
  products: CartProduct[];
  totalPrice: number;
  createdAt: string; 
  updatedAt: string;
  __v: number;
}

const OrderSummary = ({
  ordersData,
  isLoadingOrders,
}: {
  ordersData: CartResponse;
  isLoadingOrders: boolean;
}) => {
  const orderItems = ordersData?.products || [];

  const subtotal = orderItems.reduce((acc: number, item: CartProduct) => {
    return acc + parseFloat(item.price) * (item.quantity || 1);
  }, 0);

  if (isLoadingOrders) {
    return (
      <div className="p-8 text-center animate-pulse">Loading Summary...</div>
    );
  }
  return (
    <div className="lg:col-span-5">
      <div className="bg-gray-50/50 p-8 rounded-lg border border-gray-100 sticky top-10">
        <h2 className="text-xl font-bold mb-8">Order Summary</h2>

        <div className="space-y-6 mb-10">
          {orderItems.map((item: CartProduct) => (
            <div key={item.productId} className="flex gap-4">
              <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={String(item.name)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 leading-snug">
                    {item.name}
                  </h3>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                    <p className="text-xs text-gray-500">Color: {item.color}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  €{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-medium">Subtotal</span>
            <span className="font-semibold text-gray-900">
              €{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-medium">Shipping</span>
            <span className="text-gray-900 font-bold text-xs">FREE</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-4 mt-2">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">€{ordersData.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
