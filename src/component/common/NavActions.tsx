import { LuUser, LuShoppingBag, LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCart } from "../../hooks/useCart";
import type { CartProduct } from "../cart/OrderSummary";

interface NavActionsProps {
  onOpenCart: () => void;
  onOpenMenu: () => void;
}

const NavActions = ({ onOpenCart, onOpenMenu }: NavActionsProps) => {
  const { cart } = useCart();
  const count =
    cart?.products?.reduce(
      (acc: number, item: CartProduct) => acc + item.quantity,
      0,
    ) || 0;
  return (
    <div className="flex items-center justify-center gap-2">
      <Link to="/profile">
        <LuUser className="h-6 w-6" />
      </Link>

      <p className="relative">
        <button onClick={onOpenCart}>
          <LuShoppingBag className="h-6 w-6" />
          <span className=" absolute -right-4 -top-2 bg-naseej-red text-white px-2 text-xs border rounded-xl">
            {count}
          </span>
        </button>
      </p>
      <SearchBar />

      <button onClick={onOpenMenu}>
        <LuMenu className=" h-6 w-6 cursor-pointer md:hidden" />
      </button>
    </div>
  );
};

export default NavActions;
