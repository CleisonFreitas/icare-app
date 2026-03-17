import { CustomInput } from "@/app/shared/components/custom.input"
import { CustomSelect } from "@/app/shared/components/custom.select"
import type { ContatoType } from "../../types/contato.type"
import type { OptionType } from "@/app/shared/types/option.type";

export type ContatoCardPageProps = {
    contato: ContatoType;
    index: number;
    podeMarcarComoPreferencial: boolean;
    handleNomeContatoChange: (index: number, value: string) => void;
    handleSelectChange: (index: number, e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleInputChange: (index: number, value: string) => void;
    handleCheckboxChange: (index: number) => void;
    placeholderNome?: string;
    placeholderValor?: string;
    errorNomeMessage?: string;
    errorTipoMessage?: string;
    errorValorMessage?: string;
    opcoesDeContato: OptionType[];
}
export const ContatoCardPage = ({
    contato,
    index,
    podeMarcarComoPreferencial = true,
    handleNomeContatoChange,
    handleSelectChange,
    handleInputChange,
    handleCheckboxChange,
    placeholderNome,
    placeholderValor,
    errorNomeMessage,
    errorTipoMessage,
    errorValorMessage,
    opcoesDeContato
}: ContatoCardPageProps) => {
    return (
        <div key={index} className="flex flex-col gap-2 justify-center rounded-lg shadow shadow-gray-700 p-4">
            <CustomInput
                label={`Nome do contato ${index + 1}`}
                onChange={(e) => handleNomeContatoChange(index, e.target.value)}
                value={contato.nome}
                placeholder={placeholderNome}
                errorMessage={errorNomeMessage}
                required
            />
            <div className="flex justify-start items-center gap-2 flex-col md:flex-row">
                <span className="w-full md:w-[250px]">
                    <CustomSelect
                        label={`Contato ${index + 1}`}
                        id={`contato${index + 1}`}
                        onChange={(e) => handleSelectChange(index, e)}
                        value={contato.tipo}
                        options={opcoesDeContato}
                        errorMessage={errorTipoMessage}
                        required
                    />
                </span>
                <span className="w-full md:mt-5 mt-0">
                    <CustomInput
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        value={contato.valor}
                        placeholder={placeholderValor}
                        errorMessage={errorValorMessage}
                    />
                </span>
            </div>
            <span className="flex items-center gap-2">
                <label
                    htmlFor={`preferencial${index}`}
                    className="text-sm text-gray-600 font-bold"
                >Contato preferencial
                </label>
                <input
                    type="checkbox"
                    id={`preferencial${index}`}
                    checked={contato.preferencial}
                    onChange={() => handleCheckboxChange(index)}
                    disabled={!podeMarcarComoPreferencial}
                />
            </span>
        </div>
    )
}