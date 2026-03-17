import { useState, type SyntheticEvent } from "react"
import { CustomSearchCard } from "@/app/shared/components/custom-search.card"
import { CustomInput } from "@/app/shared/components/custom.input"
import { CustomSelect } from "@/app/shared/components/custom.select"
import { filtroClientes } from "../../features/clientes/enums/filtro-cliente.enum"
import type { OptionType } from "@/app/shared/types/option.type"
import { ButtonLoading } from "@/app/shared/components/button.loading"
import type { FormPesquisaType } from "@/app/shared/types/form-pesquisa.type"
import { FaSearch } from "react-icons/fa"

export const FormPesquisa = ({ data, onSubmit, isLoading = false }: FormPesquisaType) => {
    const [selectedFilter, setSelectedFilter] = useState<OptionType | null>(null)

    const [textValue, setTextValue] = useState("")
    const [dateRange, setDateRange] = useState({
        inicio: "",
        fim: ""
    });

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!selectedFilter) return

        const payload: Record<string, any> = {}

        if (selectedFilter.type === "text" && textValue) {
            payload[selectedFilter.value] = textValue
        }

        if (selectedFilter.type === "date") {
            if (dateRange.inicio) {
                payload["data_inicio"] = dateRange.inicio
            }

            if (dateRange.fim) {
                payload["data_fim"] = dateRange.fim
            }
        }

        onSubmit(payload)
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = filtroClientes.find(
            (option) => option.value === e.target.value
        ) || null

        setSelectedFilter(selected)

        setTextValue("")
        setDateRange({ inicio: "", fim: "" })
    }

    return (
        <CustomSearchCard title="Pesquisar clientes">
            <form
                method="GET"
                className="flex flex-col w-full gap-4"
                onSubmit={handleSubmit}
            >

                <div className="flex justify-start flex-col gap-4 md:flex-row items-end">

                    <div className="w-full md:w-[30%]">
                        <CustomSelect
                            label="Filtro:"
                            value={selectedFilter?.value || ""}
                            onChange={handleSelectChange}
                            options={data}
                            required
                        />
                    </div>

                    <div className="w-full flex flex-col md:flex-row gap-4">
                        {selectedFilter?.type === "text" && (
                            <div className="w-full">
                                <CustomInput
                                    label="Valor"
                                    value={textValue}
                                    onChange={(e) => setTextValue(e.target.value)}
                                    placeholder="Digite o valor..."
                                />
                            </div>

                        )}

                        {selectedFilter?.type === "date" && (
                            <div className="w-full grid grid-cols-2 flex-col md:flex-row gap-2">
                                <CustomInput
                                    label="Data início"
                                    type="date"
                                    value={dateRange.inicio}
                                    onChange={(e) =>
                                        setDateRange({ ...dateRange, inicio: e.target.value })
                                    }
                                />

                                <CustomInput
                                    label="Data fim"
                                    type="date"
                                    value={dateRange.fim}
                                    onChange={(e) =>
                                        setDateRange({ ...dateRange, fim: e.target.value })
                                    }
                                />
                            </div>
                        )}

                    </div>

                </div>
                <span className="self-end w-full md:w-[200px]">
                    <ButtonLoading isLoading={isLoading} size="medium">
                        <span className="flex justify-between p-2 items-center gap-4 w-full">
                            <FaSearch />
                            <p>Buscar</p>
                        </span>
                    </ButtonLoading>
                </span>
            </form>
        </CustomSearchCard>
    )
}