import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FormPesquisaCliente } from "../components/form-pesquisa-cliente.page";
import { TabelaCliente } from "../components/tabela-cliente";
import { useState } from "react";
import { ClienteService } from "../services/cliente.service";
import type { ClienteType } from "../types/cliente.type";

const ClientePage = () => {
  const [filtros, setFiltros] = useState<Record<string, any>>({})

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState<{
    field?: string
    direction?: "asc" | "desc"
  }>({})

  const query = useQuery({
    queryKey: ["clientes", filtros, page, limit, sort],
    queryFn: () =>
      ClienteService.getAll({
        ...filtros,
        page,
        limite: limit,
        ordenar_por: sort.field,
        direcao: sort.direction
      }),
    placeholderData: keepPreviousData
  })

  return (
    <section className="flex flex-col items-center gap-[50px]">
      <FormPesquisaCliente
        onSubmit={(payload) => {
          setPage(1)
          setFiltros(payload)
        }}
        isLoading={query.isLoading}
      />

      <TabelaCliente
        clientes={query.data?.data ?? []}
        meta={query.data?.meta}
        onPageChange={setPage}
        onLimitChange={(newLimit: number) => {
          setLimit(newLimit)
          setPage(1)
        }}
        onSort={(field: keyof ClienteType, direction: "asc" | "desc") =>
          setSort({ field: field as string, direction })
        }
      />
    </section>
  )
}

export default ClientePage;