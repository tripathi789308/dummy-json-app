import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  setPage,
  setLimit,
  setSearchQuery,
  setNameFilter,
  setEmailFilter,
  setBirthDateFilter,
  setGenderFilter,
  resetFilters,
} from "../store/features/users/userSlice";
import { RootState, AppDispatch } from "../store/store";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import PageSizeDropdown from "./PageSizeDropdown";
import SearchInput from "./SearchInput";
import FilterInput from "./FilterInput";

const UsersPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    data,
    loading,
    error,
    total,
    page,
    limit,
    searchQuery,
    nameFilter,
    emailFilter,
    birthDateFilter,
    genderFilter,
  } = useSelector((state: RootState) => state.users);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(
      fetchUsers({
        page,
        limit,
        name: nameFilter,
        email: emailFilter,
        birthDate: birthDateFilter,
        gender: genderFilter,
      }),
    );
  }, [
    dispatch,
    page,
    limit,
    nameFilter,
    emailFilter,
    birthDateFilter,
    genderFilter,
  ]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit(newLimit));
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleNameFilterChange = (name: string) => {
    dispatch(resetFilters());
    dispatch(setNameFilter(name));
  };

  const handleEmailFilterChange = (email: string) => {
    dispatch(resetFilters());
    dispatch(setEmailFilter(email));
  };

  const handleBirthDateFilterChange = (birthDate: string) => {
    dispatch(resetFilters());
    dispatch(setBirthDateFilter(birthDate));
  };

  const handleGenderFilterChange = (gender: string) => {
    dispatch(resetFilters());
    dispatch(setGenderFilter(gender));
  };

  const columns = [
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Maiden Name", accessor: "maidenName" },
    { Header: "Age", accessor: "age" },
    { Header: "Gender", accessor: "gender" },
    { Header: "Email", accessor: "email" },
    { Header: "Username", accessor: "username" },
    { Header: "Blood Group", accessor: "bloodGroup" },
    { Header: "Eye Color", accessor: "eyeColor" },
  ];

  const filteredData = searchQuery
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    : data;

  return (
    <div className="container mx-auto p-4 font-['Neutra Text']">
      <h1 className="text-2xl font-bold mb-4">Home/Users</h1>

      <div className="flex items-center justify-between mb-4">
        <PageSizeDropdown value={limit} onChange={handleLimitChange} />
      </div>

      <SearchInput onSearch={handleSearch} />

      <div className="grid grid-cols-4 gap-4 mb-4">
        <FilterInput
          label="Name"
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
        <FilterInput
          label="Email"
          value={emailFilter}
          onChange={handleEmailFilterChange}
        />
        <FilterInput
          label="Birth Date"
          value={birthDateFilter}
          onChange={handleBirthDateFilterChange}
        />
        <FilterInput
          label="Gender"
          value={genderFilter}
          onChange={handleGenderFilterChange}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <DataTable columns={columns} data={filteredData} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default UsersPage;
