import { useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function SearchBarHandler() {
    setIsOpen((prev) => !prev);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchTerm.trim() == "") return;

    navigate(`/products?=${searchTerm}`);
    setIsOpen(false);
    setSearchTerm("")
  }

  return (
    <div
      className={`flex items-center  transition-all duration-300 ${
        isOpen
          ? "fixed inset-0 w-full bg-white text-black h-20 z-50 px-4 shadow-md"
          : "relative w-auto"
      } `}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearchSubmit}
          className=" relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              autoFocus
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg 
              focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2
            text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <LuSearch className="h-6 w-6" />
            </button>
          </div>
          <button
            onClick={SearchBarHandler}
            className="absolute right-0 top-1/2 transform -translate-y-1/2
            text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <LuX className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={SearchBarHandler}>
          <LuSearch className=" h-6 w-6 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
