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
    <div
      className={`${
        loading ? "flex items-center" : ""
      } overflow-x-auto  max-h-[400px] min-h-[400px]`}
    >
      {loading ? (
        <Spinner />
      ) : (
        <table className="min-w-full divide-y divide-custom-black">
          <thead className="bg-custom-blue">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.Header}
                  className="px-6 py-3 text-left text-xs font-bold text-custom-black uppercase"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-custom-black">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-custom-gray">
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.accessor}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-custom-black"
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
