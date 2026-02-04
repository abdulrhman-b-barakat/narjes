import { Link } from "react-router-dom";
import { CATEGORIES } from "../../constants";
import CartDrawer from "../layout/CartDrawer";
import NavDrawer from "../layout/NavDrawer";
import { useState } from "react";
import NavActions from "../common/NavActions";

const Header = () => {
  const [cartDrawer, setCartDrawer] = useState(false);
  const [navDrawer, setNavDrawer] = useState(false);

  function toggleCartDrawer() {
    setCartDrawer((prev) => !prev);
  }
  function toggleNavDrawer() {
    setNavDrawer((prev) => !prev);
  }

  return (
    <header className="container flex items-center justify-between py-4 px-4 border-b border-gray-200 ">
      <h1 className="text-2xl font-medium">
        <Link to="/">Narjes</Link>
      </h1>

      <nav>
        <ul className="hidden md:flex space-x-6">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link
                to={category.slug}
                className="text-gray-700 hover:text-black text-sm font-medium uppercase"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <NavActions onOpenCart={toggleCartDrawer} onOpenMenu={toggleNavDrawer} />
      <CartDrawer cartDrawerBolean={cartDrawer} onClose={toggleCartDrawer} />
      <NavDrawer navDrawerBolean={navDrawer} onClose={toggleNavDrawer} />
    </header>
  );
};

export default Header;
