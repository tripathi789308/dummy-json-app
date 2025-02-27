import React from "react";
import Spinner from "../icons/Spinner";
import { User } from "../store/features/users/userSlice";
import { Product } from "../store/features/products/productSlice";

interface Column {
  Header: string;
  accessor: string;
}

interface DataTableProps {
  columns: Column[];
  data: User[] | Product[];
  loading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, loading }) => {
  return (
    <div className="overflow-x-auto  h-[400px]">
      {loading ? (
        <Spinner />
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#c0e3e5]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.Header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-200">
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.accessor}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {(row as unknown as Record<string, string | number>)?.[
                      column.accessor
                    ] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
