type MetaType = {
  current_page: number
  last_page: number
  limite: number
  total: number
}

type PaginationProps = {
  meta: MetaType
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function DataTablePagination({
  meta,
  onPageChange,
  onLimitChange
}: PaginationProps) {

  const generatePages = () => {
    const pages: number[] = []

    const start = Math.max(1, meta.current_page - 2)
    const end = Math.min(meta.last_page, meta.current_page + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-between p-4 border-t bg-gray-50 flex-wrap gap-4">

      {/* Limite */}
      <div className="flex items-center gap-2 text-sm">
        <span>Itens por página:</span>
        <select
          value={meta.limite}
          onChange={(e) =>
            onLimitChange?.(Number(e.target.value))
          }
          className="border rounded-lg px-2 py-1 bg-white outline-none"
        >
          {[10, 20, 50, 100].map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </select>
      </div>

      {/* Paginação */}
      <div className="flex items-center gap-2 text-sm flex-wrap">

        <button
          disabled={meta.current_page === 1}
          onClick={() => onPageChange?.(meta.current_page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          {"<"}
        </button>

        {meta.current_page > 3 && (
          <>
            <button
              onClick={() => onPageChange?.(1)}
              className="px-3 py-1 border rounded"
            >
              1
            </button>
            <span>...</span>
          </>
        )}

        {generatePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={`px-3 py-1 border rounded ${
              page === meta.current_page
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {meta.current_page < meta.last_page - 2 && (
          <>
            <span>...</span>
            <button
              onClick={() => onPageChange?.(meta.last_page)}
              className="px-3 py-1 border rounded"
            >
              {meta.last_page}
            </button>
          </>
        )}

        <button
          disabled={meta.current_page === meta.last_page}
          onClick={() => onPageChange?.(meta.current_page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  )
}