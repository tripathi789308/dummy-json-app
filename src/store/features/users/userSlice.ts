import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  username: string;
  bloodGroup: string;
  eyeColor: string;
}

interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  searchQuery: string;
  nameFilter: string;
  emailFilter: string;
  birthDateFilter: string;
  genderFilter: string;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 5,
  searchQuery: "",
  nameFilter: "",
  emailFilter: "",
  birthDateFilter: "",
  genderFilter: "",
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    {
      page,
      limit,
      name,
      email,
      birthDate,
      gender,
    }: {
      page: number;
      limit: number;
      name?: string;
      email?: string;
      birthDate?: string;
      gender?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      let url = `https://dummyjson.com/users?limit=${limit}&skip=${
        (page - 1) * limit
      }`;

      if (name) {
        url += `&firstName=${name}`;
      }
      if (email) {
        url += `&email=${email}`;
      }
      if (birthDate) {
        url += `&birthDate=${birthDate}`;
      }
      if (gender) {
        url += `&gender=${gender}`;
      }

      const response = await axios.get(url);

      return {
        data: response.data.users,
        total: response.data.total,
      };
    } catch (error) {
      return rejectWithValue(`An error occurred - ${error}`);
    }
  },
);

const usersSlice = createSlice({
  name: "users",
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
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload;
    },
    setEmailFilter: (state, action: PayloadAction<string>) => {
      state.emailFilter = action.payload;
    },
    setBirthDateFilter: (state, action: PayloadAction<string>) => {
      state.birthDateFilter = action.payload;
    },
    setGenderFilter: (state, action: PayloadAction<string>) => {
      state.genderFilter = action.payload;
    },
    resetFilters: (state) => {
      state.nameFilter = "";
      state.emailFilter = "";
      state.birthDateFilter = "";
      state.genderFilter = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<{ data: User[]; total: number }>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.total = action.payload.total;
        },
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPage,
  setLimit,
  setSearchQuery,
  setNameFilter,
  setEmailFilter,
  setBirthDateFilter,
  setGenderFilter,
  resetFilters,
} = usersSlice.actions;
export default usersSlice.reducer;
