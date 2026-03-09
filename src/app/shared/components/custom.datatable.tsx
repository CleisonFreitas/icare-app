import { useState } from "react"
import type { ColumnType } from "../types/table-column.type"
import { DataTablePagination } from "./data-table.pagination"

type PaginationMeta = {
    current_page: number
    last_page: number
    limite: number
    total: number
}

type DataTableProps<T> = {
    columns: ColumnType<T>[]
    data: T[]

    meta?: PaginationMeta

    onPageChange?: (page: number) => void
    onLimitChange?: (limit: number) => void
    onSort?: (field: keyof T, direction: "asc" | "desc") => void
}

export function CustomDataTable<T extends object>({
    columns,
    data,
    meta,
    onPageChange,
    onLimitChange,
    onSort
}: DataTableProps<T>) {

    const [sortField, setSortField] = useState<keyof T | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const handleSort = (field: keyof T) => {
        let direction: "asc" | "desc" = "asc"

        if (sortField === field) {
            direction = sortDirection === "asc" ? "desc" : "asc"
        }

        setSortField(field)
        setSortDirection(direction)

        onSort?.(field, direction)
    }

    return (
        <div className="w-full rounded-xl bg-white shadow-md overflow-hidden">
            {meta && (
                <DataTablePagination
                    meta={meta}
                    onPageChange={onPageChange}
                    onLimitChange={onLimitChange}
                />
            )}

            <div className="overflow-auto">
                <table className="w-full border-collapse">

                    <thead>
                        <tr className="text-left">
                            {columns.map((col) => (
                                <th
                                    key={String(col.accessor)}
                                    className={`p-3 text-sm font-semibold text-blue-950 ${col.sortable ? "cursor-pointer select-none" : ""
                                        }`}
                                    onClick={() => {
                                        if (col.sortable) {
                                            handleSort(col.accessor)
                                        }
                                    }}
                                >
                                    {col.header}

                                    {col.sortable && sortField === col.accessor && (
                                        <span className="ml-2">
                                            {sortDirection === "asc" ? "↑" : "↓"}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={String(col.accessor)}
                                        className={`p-3 text-sm ${col.clickable
                                            ? "text-blue-600 cursor-pointer hover:underline"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            col.clickable && col.onClick?.(row)
                                        }
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : String(row[col.accessor])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINAÇÃO */}
            {meta && (
                <DataTablePagination
                    meta={meta}
                    onPageChange={onPageChange}
                    onLimitChange={onLimitChange}
                />
            )}
        </div>
    )
}