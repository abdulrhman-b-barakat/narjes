import { useSearchParams } from "react-router-dom";
import {
  BRANDS,
  CATEGORIES_PRODUCTS,
  GENDERS,
  MATERIALS,
  SIZES,
} from "../../constants";
import { getActiveFilters } from "../../utils/filterUtils";
import FilterItem from "./FilterItem";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = getActiveFilters(searchParams);



  const updateFilters = (
    name: string,
    value: string | number,
    isCheckbox = false,
    checked = false,
  ) => {
    const newParamas = new URLSearchParams(searchParams);

    if (isCheckbox) {
      const currentValues = newParamas.get(name)?.split(",") || [];
      const updatedValues = checked
        ? [...currentValues, value as string]
        : currentValues?.filter((v) => v !== value);

      if (updatedValues.length > 0) {
        newParamas.set(name, updatedValues.join(","));
      } else newParamas.delete(name);
    } else {
      if (value) newParamas.set(name, value.toString());
      else newParamas.delete(name);
    }

    setSearchParams(newParamas);
  };

  return (
    <div className="p-4 space-y-8">
      <h3 className="text-xl font-bold text-gray-900 border-b pb-4">Filters</h3>

      {/* Category - Radio */}
      <div>
        <h4 className="font-semibold mb-3 uppercase text-xs text-gray-500">
          Category
        </h4>
        {CATEGORIES_PRODUCTS.map((cat) => (
          <FilterItem
            key={cat}
            label={cat}
            type="radio"
            name="category"
            value={cat}
            checked={filters.category === cat}
            onChange={(e) => updateFilters("category", e.target.value)}
          />
        ))}
      </div>

      {/* Gender - Radio */}
      <div>
        <h4 className="font-semibold mb-3 uppercase text-xs text-gray-500">
          Gender
        </h4>
        {GENDERS.map((gender) => (
          <FilterItem
            key={gender}
            label={gender}
            type="radio"
            name="gender"
            value={gender}
            checked={filters.gender === gender}
            onChange={(e) => updateFilters("gender", e.target.value)}
          />
        ))}
      </div>

      {/* Checkbox */}

      <div>
        <h4 className="font-semibold mb-3 uppercase text-xs text-gray-500">
          Size
        </h4>
        {SIZES.map((size) => (
          <FilterItem
            key={size}
            label={size}
            type="checkbox"
            name="size"
            value={size}
            checked={filters.size.includes(size)}
            onChange={(e) =>
              updateFilters("size", e.target.value, true, e.target.checked)
            }
          />
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-3 uppercase text-xs text-gray-500">
          Material
        </h4>
        {MATERIALS.map((mat) => (
          <FilterItem
            key={mat}
            label={mat}
            type="checkbox"
            name="material"
            value={mat}
            checked={filters.material.includes(mat)}
            onChange={(e) =>
              updateFilters("material", e.target.value, true, e.target.checked)
            }
          />
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-3 uppercase text-xs text-gray-500">
          Brand
        </h4>
        {BRANDS.map((brand) => (
          <FilterItem
            key={brand}
            label={brand}
            type="checkbox"
            name="brand"
            value={brand}
            checked={filters.brand.includes(brand)}
            onChange={(e) =>
              updateFilters("brand", e.target.value, true, e.target.checked)
            }
          />
        ))}
      </div>

      {/* Price Slider */}
      <div>
        <h4 className="font-semibold mb-3 uppercase text-sm text-gray-500">
          Max Price:{" "}
          <span className="text-blue-600 text-lg">${filters.maxPrice}</span>
        </h4>
        <input
          type="range"
          min={0}
          max={100}
          value={filters.maxPrice}
          onChange={(e) => updateFilters("maxPrice", e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
