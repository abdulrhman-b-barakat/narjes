import { LuX } from "react-icons/lu";
import { CATEGORIES } from "../../constants";
import { Link } from "react-router-dom";

const navDrawer = ({
  navDrawerBolean,
  onClose,
}: {
  navDrawerBolean: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-full sm:w-1/2 md:w-1/3 bg-white shadow-xl p-5 flex flex-col ${
        navDrawerBolean ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <button onClick={onClose} className="absolute right-5 top-5 z-10">
        <LuX className="text-xl cursor-pointer" />
      </button>

      <div className="mt-4">
        <h2 className="text-2xl font-medium mb-5">Menu</h2>
        <ul className="ml-2 space-y-3">
          {CATEGORIES.map((link) => (
            <li
              key={link.name}
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              <Link to={link.slug}> {link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default navDrawer;
