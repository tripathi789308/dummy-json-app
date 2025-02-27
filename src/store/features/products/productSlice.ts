import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  searchQuery: string;
  titleFilter: string;
  categoryFilter: string;
  brandFilter: string;
  activeTab: "All" | "Laptops";
}

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 5,
  searchQuery: "",
  titleFilter: "",
  categoryFilter: "",
  brandFilter: "",
  activeTab: "All",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      page,
      limit,
      category,
      title,
      brand,
    }: {
      page: number;
      limit: number;
      category?: string;
      title?: string;
      brand?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${
        (page - 1) * limit
      }`;

      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${
          (page - 1) * limit
        }`;
      }
      if (title) {
        url = `https://dummyjson.com/products/search?q=${title}`;
      }
      if (brand) {
        url = `https://dummyjson.com/products/search?q=${brand}`;
      }

      const response = await axios.get(url);

      return {
        data: response.data.products,
        total: response.data.total,
      };
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage = `API Error: ${error.message}`;
        if (error.response) {
          errorMessage += ` (Status: ${error.response.status})`;
        }
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }

      return rejectWithValue(errorMessage);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
      state.page = 1;
    },
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.titleFilter = action.payload;
      state.page = 1;
    },
    setBrandFilter: (state, action: PayloadAction<string>) => {
      state.brandFilter = action.payload;
      state.page = 1;
    },
    setActiveTab: (state, action: PayloadAction<"All" | "Laptops">) => {
      state.activeTab = action.payload;
      state.categoryFilter = action.payload === "Laptops" ? "laptops" : "";
      state.page = 1;
    },
    resetFilters: (state) => {
      state.categoryFilter = "";
      state.titleFilter = "";
      state.brandFilter = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<{ data: Product[]; total: number }>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.total = action.payload.total;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPage,
  setLimit,
  setSearchQuery,
  setTitleFilter,
  setCategoryFilter,
  setBrandFilter,
  setActiveTab,
  resetFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
