import { useState, useMemo } from "react";
import Table from "./Table";
import { mockData } from "../data/mockData";

// Custom filter function for date
function dateJoinedFilterFn(
  rows: any[],
  id: string,
  filterValue: { type: string; value: string },
) {
  if (!filterValue || !filterValue.value) return rows;
  if (filterValue.type === "month") {
    // filterValue.value is "YYYY-MM"
    return rows.filter((row) => {
      const date = new Date(row.values[id]);
      const [year, month] = filterValue.value.split("-");
      return (
        date.getFullYear() === Number(year) &&
        date.getMonth() + 1 === Number(month)
      );
    });
  } else if (filterValue.type === "date") {
    // filterValue.value is "YYYY-MM-DD"
    return rows.filter((row) => {
      const date = new Date(row.values[id]);
      const [year, month, day] = filterValue.value.split("-");
      return (
        date.getFullYear() === Number(year) &&
        date.getMonth() + 1 === Number(month) &&
        date.getDate() === Number(day)
      );
    });
  }
  return rows;
}

export default function TableContainer() {
  const [reset, setReset] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Filter: ({ column }: { column: any }) => (
          <input
            type="text"
            placeholder="Search name..."
            className="w-full p-1 border rounded"
            value={column.filterValue || ""}
            onChange={(e) => column.setFilter(e.target.value)}
          />
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        Filter: ({ column }: { column: any }) => (
          <input
            type="text"
            placeholder="Search email..."
            className="w-full p-1 border rounded"
            value={column.filterValue || ""}
            onChange={(e) => column.setFilter(e.target.value)}
          />
        ),
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: ({ column }: { column: any }) => (
          <input
            type="text"
            placeholder="Search role..."
            className="w-full p-1 border rounded"
            value={column.filterValue || ""}
            onChange={(e) => column.setFilter(e.target.value)}
          />
        ),
      },
      {
        Header: "Salary",
        accessor: "salary",
        Filter: ({ column }: { column: any }) => (
          <input
            type="text"
            placeholder="Search salary..."
            className="w-full p-1 border rounded"
            value={column.filterValue || ""}
            onChange={(e) => column.setFilter(e.target.value)}
          />
        ),
      },
      {
        Header: "Date Joined",
        accessor: "dateJoined",
        Filter: ({ column }: { column: any }) => {
          // Store filter type and value in a single object
          const filterValue = column.filterValue || { type: "", value: "" };
          return (
            <div className="flex flex-col gap-1">
              <input
                type="month"
                className="w-full p-1 border rounded"
                value={filterValue.type === "month" ? filterValue.value : ""}
                onChange={(e) =>
                  column.setFilter({
                    type: "month",
                    value: e.target.value,
                  })
                }
              />
            </div>
          );
        },
        filter: dateJoinedFilterFn,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: ({ column }: { column: any }) => (
          <select
            className="w-full p-1 border rounded"
            value={column.filterValue || ""}
            onChange={(e) => column.setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        ),
      },
    ],
    [],
  );

  const data = useMemo(() => mockData, [mockData]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => setReset(!reset)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset Filters
      </button>
      <Table columns={columns} data={data} reset={reset} />
    </div>
  );
}
