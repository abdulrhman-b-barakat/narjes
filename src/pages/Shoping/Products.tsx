import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../../component/product/FilterSidebar";
import { useEffect, useRef, useState } from "react";
import SortOptions from "../../component/product/SortOptions";
import { useProducts } from "../../hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../component/product/ProductGrid";

const Products = () => {
  const [searchParams] = useSearchParams();
  const filters = Object.fromEntries([...searchParams]);
  const { data } = useProducts(filters);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <div>
        <button
          onClick={toggleSidebar}
          className=" w-full lg:hidden border border-gray-300 p-2 flex justify-center items-center"
        >
          <FaFilter className="mr-2" /> Filters
        </button>

        {/* Fil ter Sidebar */}
        <div
          ref={sidebarRef}
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
        >
          <FilterSidebar />
        </div>
      </div>
      <div className="flex-grop p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        <SortOptions />
        <ProductGrid products={data || []} />
      </div>
    </div>
  );
};

export default Products;
