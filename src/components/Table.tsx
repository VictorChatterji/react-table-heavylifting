import { ArrowUpDown } from "lucide-react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useMemo } from "react";

export default function Table({ columns, data, reset }: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    // gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    setFilter,
    allColumns,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy,
    usePagination,
  ) as any;

  useMemo(() => {
    if (reset) {
      allColumns.forEach((column: any) => column.setFilter(""));
    }
  }, [reset, allColumns]);

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="w-full border-collapse"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 border-b bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    {column.render("Header")}
                    <span>
                      <ArrowUpDown
                        onClick={() =>
                          column.toggleSortBy(!column.isSortedDesc)
                        }
                      ></ArrowUpDown>
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border-b">
                    {cell.value instanceof Date
                      ? cell.value.toLocaleDateString() // or use toISOString(), or your preferred format
                      : cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Next
          </button>
        </div>
        <span>
          Page {pageIndex + 1} of {pageCount}
        </span>
      </div>
    </div>
  );
}
