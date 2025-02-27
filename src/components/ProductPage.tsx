import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setPage,
  setLimit,
  setSearchQuery,
  setCategoryFilter,
  setBrandFilter,
  setActiveTab,
  resetFilters,
  setTitleFilter,
} from "../store/features/products/productSlice";
import { RootState, AppDispatch } from "../store/store";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import PageSizeDropdown from "./PageSizeDropdown";
import SearchInput from "./SearchInput";
import FilterInput from "./FilterInput";
import RemovableSpan from "./RemovableSpan";
import { debounce } from "../utils/debounce";

const ProductsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    data,
    loading,
    error,
    total,
    page,
    limit,
    searchQuery,
    titleFilter,
    categoryFilter,
    brandFilter,
    activeTab,
  } = useSelector((state: RootState) => state.products);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    if (
      categoryFilter.length > 0 ||
      titleFilter.length > 0 ||
      brandFilter.length > 0
    ) {
      debouncedFilterProducts();
    } else handleFilterProducts();
  }, [dispatch, page, limit, categoryFilter, titleFilter, brandFilter]);

  const handleFilterProducts = () => {
    dispatch(
      fetchProducts({
        page,
        limit,
        category: categoryFilter,
        title: titleFilter,
        brand: brandFilter,
      }),
    );
  };

  const debouncedFilterProducts = debounce(handleFilterProducts, 500);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit(newLimit));
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleTitleFilterChange = (title: string) => {
    dispatch(resetFilters());
    dispatch(setTitleFilter(title));
  };

  const handleCategoryFilterChange = (category: string) => {
    dispatch(resetFilters());
    dispatch(setCategoryFilter(category));
  };

  const handleBrandFilterChange = (brand: string) => {
    dispatch(resetFilters());
    dispatch(setBrandFilter(brand));
  };

  const handleTabChange = (tab: "All" | "Laptops") => {
    dispatch(setActiveTab(tab));
  };

  const filterAdded = useMemo(() => {
    return titleFilter.length > 0
      ? titleFilter
      : categoryFilter.length > 0
      ? categoryFilter
      : brandFilter.length > 0
      ? brandFilter
      : undefined;
  }, [titleFilter, categoryFilter, brandFilter]);

  const columns = [
    { Header: "Title", accessor: "title" },
    { Header: "Price", accessor: "price" },
    { Header: "Discount", accessor: "discountPercentage" },
    { Header: "Rating", accessor: "rating" },
    { Header: "Stock", accessor: "stock" },
    { Header: "Brand", accessor: "brand" },
    { Header: "Category", accessor: "category" },
    { Header: "Description", accessor: "description" },
  ];

  const filteredData = searchQuery
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    : data;

  return (
    <div className="container flex flex-col gap-1 mx-auto p-4 font-['Neutra Text']">
      <h1 className="text-2xl font-bold mb-4">Home/Products</h1>

      <div className="flex flex-row gap-4 items-center justify-between mb-4">
        <div className="flex flex-row gap-4 w-[45%] items-center">
          <PageSizeDropdown value={limit} onChange={handleLimitChange} />
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="flex flex-row gap-2 w-[55%] items-center">
          <FilterInput
            label="Title"
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
          <FilterInput
            label="Category"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
          />
          <FilterInput
            label="Brand"
            value={brandFilter}
            onChange={handleBrandFilterChange}
          />
        </div>
      </div>

      <div>
        {filterAdded && (
          <div>
            <RemovableSpan
              text={`Filter: ${filterAdded}`}
              onRemove={() => {
                handleTabChange("All");
                dispatch(resetFilters());
              }}
            />
          </div>
        )}
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleTabChange("All")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "All"
              ? "bg-custom-blue text-custom-black"
              : "transparent"
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => handleTabChange("Laptops")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "Laptops"
              ? "bg-custom-blue text-custom-black"
              : "transparent"
          }`}
        >
          Laptops
        </button>
      </div>

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          <DataTable columns={columns} data={filteredData} loading={loading} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
