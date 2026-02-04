import { LuX } from "react-icons/lu";
import CartContent from "../cart/CartContent";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({
  cartDrawerBolean,
  onClose,
}: {
  cartDrawerBolean: boolean;
  onClose: () => void;
  }) => {
  const navigate = useNavigate()

  const handleCheckOut = () => {
    navigate("/checkout");
    onClose()
  }
  
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/3 bg-white shadow-xl p-5 flex flex-col ${
        cartDrawerBolean ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <button onClick={onClose} className="absolute right-5 top-5 z-10">
        <LuX className="text-xl cursor-pointer" />
      </button>

      <div className="flex flex-col h-full">
        <div className="mb-5">
          <h2 className="text-2xl font-medium">Your Cart</h2>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <CartContent />
        </div>

        <div className="pt-5 border-t mt-auto">
          <button onClick={ handleCheckOut } className="text-white bg-black py-4 w-full font-bold uppercase text-sm mb-2 hover:bg-gray-900 transition-colors">
            Checkout
          </button>
          <p className="text-center text-[11px] text-gray-400 leading-tight">
            Shipping, taxes, and discount codes calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
