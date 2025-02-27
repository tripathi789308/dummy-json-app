import React, { useEffect, useMemo } from "react";
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
  filterUsers,
} from "../store/features/users/userSlice";
import { RootState, AppDispatch } from "../store/store";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import PageSizeDropdown from "./PageSizeDropdown";
import SearchInput from "./SearchInput";
import FilterInput from "./FilterInput";
import RemovableSpan from "./RemovableSpan";
import { debounce } from "../utils/debounce";

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
    if (nameFilter || birthDateFilter || genderFilter || emailFilter) return;
    dispatch(
      fetchUsers({
        page,
        limit,
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

  useEffect(() => {
    if (nameFilter || birthDateFilter || genderFilter || emailFilter)
      debouncedFilterUsers();
  }, [
    dispatch,
    page,
    limit,
    nameFilter,
    emailFilter,
    birthDateFilter,
    genderFilter,
  ]);
  const handleFilterUsers = () => {
    dispatch(
      filterUsers({
        page,
        limit,
        name: nameFilter,
        email: emailFilter,
        birthDate: birthDateFilter,
        gender: genderFilter,
      }),
    );
  };
  const debouncedFilterUsers = debounce(handleFilterUsers, 500);

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

  const filterAdded = useMemo(() => {
    return nameFilter.length > 0
      ? nameFilter
      : emailFilter.length > 0
      ? emailFilter
      : birthDateFilter.length > 0
      ? birthDateFilter
      : genderFilter.length > 0
      ? genderFilter
      : undefined;
  }, [nameFilter, emailFilter, birthDateFilter, genderFilter]);

  const filteredData = useMemo(() => {
    return searchQuery
      ? data.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        )
      : data;
  }, [searchQuery, data]);

  return (
    <div className="container mx-auto p-4 flex flex-col gap-1 font-['Neutra Text']">
      <h1 className="text-2xl font-bold mb-4">Home/Users</h1>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
        <div className="flex flex-row gap-4 w-[43%] items-center">
          <PageSizeDropdown value={limit} onChange={handleLimitChange} />
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="flex flex-row gap-2 w-[57%] items-center">
          <FilterInput
            label="First Name"
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
      </div>

      {filterAdded && (
        <div>
          <RemovableSpan
            text={`Filter: ${filterAdded}`}
            onRemove={() => dispatch(resetFilters())}
          />
        </div>
      )}

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

export default UsersPage;
