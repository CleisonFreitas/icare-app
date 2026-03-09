import { FormPesquisa } from "@/app/shared/components/form.pesquisa"
import { filtroClientes } from "../enums/filtro-cliente.enum"

export const FormPesquisaCliente = ({
    onSubmit,
    isLoading
}: {
    onSubmit: (payload: any) => void
    isLoading: boolean
}) => {
    return (
        <FormPesquisa
            data={filtroClientes}
            onSubmit={onSubmit}
            isLoading={isLoading}
        />
    )
}