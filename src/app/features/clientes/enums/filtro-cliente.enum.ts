import type { OptionType } from "@/app/shared/types/option.type"

export const filtroClientes: OptionType[] = [
  { label: "Nome", value: "nome", type: "text" },
  { label: "Documento", value: "documento", type: "text" },
  { label: "Email", value: "email", type: "text" },
  { label: "Data de nascimento", value: "data_nascimento", type: "date" },
]