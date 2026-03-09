import { useNavigate } from "react-router-dom"
import type { ClienteType } from "../types/cliente.type"
import { CustomDataTable } from "@/app/shared/components/custom.datatable"
import type { ColumnType } from "@/app/shared/types/table-column.type"

type MetaType = {
  current_page: number
  last_page: number
  limite: number
  total: number
}

type TabelaClienteProps = {
  clientes: ClienteType[]
  meta?: MetaType

  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  onSort: (
    field: keyof ClienteType,
    direction: "asc" | "desc"
  ) => void
}

export const TabelaCliente = ({ clientes, meta, onPageChange, onLimitChange, onSort }: TabelaClienteProps) => {
  const navigate = useNavigate();

  const columns: ColumnType<ClienteType>[] = [
    {
      header: "#",
      accessor: "id",
      clickable: true,
      sortable: true,
      onClick: (cliente: ClienteType) => navigate(`/cliente/${cliente.id}`)
    },
    {
      header: "Nome",
      accessor: "nome"
    },
    {
      header: "Email",
      accessor: "email",
      clickable: true,
      onClick: (cliente: ClienteType) => alert(cliente.email)
    }
  ]

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm w-full border border-gray-200 border-l-[10px] border-l-blue-600">
      <CustomDataTable
        columns={columns}
        data={clientes} 
        onSort={onSort}
        meta={meta}
        onLimitChange={onLimitChange}
        onPageChange={onPageChange}
      />
    </div>
  )
}