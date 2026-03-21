import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { ClienteService } from "../../services/cliente.service"
import { useState } from "react"
import { CustomButton } from "@/app/shared/components/custom.button"
import { FormPesquisaCliente } from "../../components/form-pesquisa-cliente.page"
import { FaUserPlus } from "react-icons/fa"
import { TabelaCliente } from "../../components/tabela-cliente"
import type { ClienteType } from "../../types/cliente.type"
import { useClientePage } from "../../contexts/cliente-page.context"

export const ClientePesquisaPage = () => {
    const { openForm } = useClientePage()
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
                direcao: sort.direction ?? "desc"
            }),
        placeholderData: keepPreviousData
    })
    return (
        <>
            <span className="w-full md:w-[200px] self-end">
                <CustomButton
                    icon={<FaUserPlus />}
                    onClick={() => openForm()}
                    size={'large'}
                >
                    Cadastrar
                </CustomButton>
            </span>

            <FormPesquisaCliente
                onSubmit={(payload) => {
                    setPage(1)
                    setFiltros(payload)
                }}
                isLoading={query.isLoading}
            />
            <span className="h-[30px]" />
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
                onRowClick={openForm}
            />
        </>
    )
}