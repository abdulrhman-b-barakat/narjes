export const getActiveFilters = (searchParams: URLSearchParams) => {
  return {
    category: searchParams.get("category") || "",
    gender: searchParams.get("gender") || "",
    size: searchParams.get("size")?.split(",") || [],
    material: searchParams.get("material")?.split(",") || [],
    brand: searchParams.get("brand")?.split(",") || [],
    maxPrice: Number(searchParams.get("maxPrice")) || 100,
  };
};
