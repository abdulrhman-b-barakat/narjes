import { LuTrash2 } from "react-icons/lu";
import { useCart } from "../../hooks/useCart";

interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

const CartContent = () => {
  const { cart, isLoading, removeFromCart, updateQuantity } = useCart();
  const dataCart = cart?.products || [];
  console.log(cart);
  const guestId = localStorage.getItem("guestId");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const userId = userInfo?._id;

  if (isLoading) return <div>loading...</div>;

  return (
    <ul className="flex items-center flex-col">
      {dataCart.map((item: CartItem, index: number) => (
        <li
          key={item.productId}
          className={` py-4 mt-3 w-full flex items-center ${index <= 1 ? "border-b border-gray-400" : ""}`}
        >
          <img
            className="rounded-sm"
            src={item.image}
            alt={item.name}
            width={90}
          />
          <div className="flex items-center justify-between w-full ml-4">
            <div>
              <h3>{item.name}</h3>

              <p className="text-gray-500">
                <span>size: {item.size}</span>
                <span> | </span>
                <span>color: {item.color}</span>
              </p>
              <p className="text-lg font-medium flex gap-3 mt-2">
                <button
                  onClick={() =>
                    item.quantity > 1
                      ? updateQuantity({
                          productId: item.productId,
                          quantity: item.quantity - 1,
                          guestId: guestId,
                          userId: userId,
                          size: item.size,
                          color: item.color,
                        })
                      : null
                  }
                  className="border border-gray-400 w-6 h-7 flex items-center justify-center rounded-sm cursor-pointer"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity({
                      productId: item.productId,
                      quantity: item.quantity + 1,
                      guestId: guestId,
                      userId: userId,
                      size: item.size,
                      color: item.color,
                    })
                  }
                  className="border border-gray-400 w-6 h-7 flex items-center justify-center rounded-sm cursor-pointer"
                >
                  +
                </button>
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <span className=" text-lg font-medium">${item.price}</span>
              <button
                onClick={() =>
                  removeFromCart.mutate({
                    productId: item.productId,
                    size: item.size,
                    color: item.color,
                    userId: userId,
                    guestId: guestId,
                  })
                }
                disabled={removeFromCart.isPending}
                className={`cursor-pointer text-red-800 ${removeFromCart.isPending ? "animate-[pulse_0.7s_infinite] text-red-400" : ""}`}
              >
                <LuTrash2 size={18} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartContent;
