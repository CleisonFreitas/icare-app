import type { OptionType } from "./option.type"

export type FormPesquisaType = {
  data: OptionType[];
  onSubmit: (payload: any) => void;
  isLoading?: boolean;
}