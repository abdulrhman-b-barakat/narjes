import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sortBy") || "";

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set("sortBy", value);
    } else {
      newParams.delete("sortBy");
    }

    setSearchParams(newParams);
  };

  return (
    <div>
      <select
        className="border border-gray-400 rounded-sm outline-none p-1 text-sm"
        id="sort"
        value={currentSort} 
        onChange={handleSortChange}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDes">Price: High to Low</option>
        <option value="Popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
