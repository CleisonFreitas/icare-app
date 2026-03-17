import { ContatoCardPage } from "../pages/parts/contato-card.page";
import type { ContatoType } from "../types/contato.type";
import type { OptionType } from "@/app/shared/types/option.type";

export type ContatoErrorType = {
    nome?: string;
    tipo?: string;
    valor?: string;
    preferencial?: string;
};

export type ContatosValidationErrors = {
    geral?: string;
    contatos?: ContatoErrorType[];
};

export type ContatosValidationResult = {
    isValid: boolean;
    errors: ContatosValidationErrors;
    contatosValidos: ContatoType[];
};

export const validateContatos = (contatos: ContatoType[]): ContatosValidationResult => {
    const errors: ContatosValidationErrors = {};
    const contatosErros: ContatoErrorType[] = [];

    const contatosValidos = contatos.filter(c => c.tipo && c.valor);

    contatos.forEach((contato, index) => {
        const cErro: ContatoErrorType = {};
        if (!contato.tipo) cErro.tipo = "Tipo do contato é obrigatório";
        if (!contato.valor) cErro.valor = "Valor do contato é obrigatório";
        if (Object.keys(cErro).length > 0) contatosErros[index] = cErro;
    });

    if (contatosValidos.length === 0) {
        errors.geral = "Insira pelo menos um contato com tipo e valor";
    }

    const hasPreferencial = contatosValidos.some(c => c.preferencial === true);
    if (!hasPreferencial) {
        errors.geral = errors.geral
            ? `${errors.geral}. Defina um contato preferencial`
            : "Defina um contato preferencial";
    }

    if (contatosErros.length > 0) errors.contatos = contatosErros;

    return {
        isValid: !errors.geral && !errors.contatos,
        errors,
        contatosValidos,
    };
};

export type ContatosEditorProps = {
    contatos: ContatoType[];
    onChange: (contatos: ContatoType[]) => void;
    errors?: ContatosValidationErrors;
    opcoesDeContato?: OptionType[];
    showHeading?: boolean;
    allowAdd?: boolean;
    allowRemove?: boolean;
    dir?: "horizontal" | "vertical"
};

export const defaultOpcoesDeContato: OptionType[] = [
    { type: "text", label: "Email", value: "EMAIL" },
    { type: "text", label: "Telefone", value: "TELEFONE" },
];

export const ContatosEditor = ({
    contatos,
    onChange,
    errors,
    opcoesDeContato = defaultOpcoesDeContato,
    showHeading = true,
    allowAdd = true,
    allowRemove = false,
    dir = "horizontal"
}: ContatosEditorProps) => {
    const getFieldError = (index: number, field: keyof ContatoErrorType) => {
        return errors?.contatos?.[index]?.[field];
    };

    const handleNomeChange = (index: number, value: string) => {
        const novoContatos = [...contatos];
        novoContatos[index] = { ...novoContatos[index], nome: value };
        onChange(novoContatos);
    };

    const handleTipoChange = (index: number, value: string) => {
        const novoContatos = [...contatos];
        novoContatos[index] = { ...novoContatos[index], tipo: value };
        onChange(novoContatos);
    };

    const handleValorChange = (index: number, value: string) => {
        const novoContatos = [...contatos];
        novoContatos[index] = { ...novoContatos[index], valor: value };
        onChange(novoContatos);
    };

    const handlePreferencialChange = (index: number) => {
        const novoContatos = [...contatos];

        if (!novoContatos[index].preferencial) {
            novoContatos.forEach((contato, i) => {
                if (i !== index) {
                    contato.preferencial = false;
                }
            });
        }

        novoContatos[index].preferencial = !novoContatos[index].preferencial;
        onChange(novoContatos);
    };

    const handleAdd = () => {
        onChange([
            ...contatos,
            { nome: "", tipo: "", valor: "", preferencial: false },
        ]);
    };

    const handleRemove = (index: number) => {
        const novoContatos = contatos.filter((_, i) => i !== index);
        onChange(novoContatos);
    };

    return (
        <div className="w-full">
            {showHeading && <h3 className="text-md font-semibold border-b-2 pb-2">Telefones</h3>}
            {errors?.geral && (
                <div className="rounded-md bg-red-100 border border-red-300 p-3 text-red-700 mb-4">
                    {errors.geral}
                </div>
            )}
            <div className={`grid grid-cols-1 ${dir === "horizontal" ? "md:grid-cols-[calc(50%-0.5rem)_calc(50%-0.5rem)]" : ""}  gap-2`}>
                {contatos.map((contato, index) => (
                    <div key={contato.id ?? index} className="relative">
                        <ContatoCardPage
                            contato={contato}
                            index={index}
                            handleNomeContatoChange={handleNomeChange}
                            handleSelectChange={(_index, e) => handleTipoChange(_index, e.target.value)}
                            handleInputChange={handleValorChange}
                            handleCheckboxChange={handlePreferencialChange}
                            placeholderNome={contato.tipo ? `Digite o seu ${contato.tipo.toLowerCase()}` : "Digite o nome do contato"}
                            placeholderValor={contato.tipo ? `Digite o seu ${contato.tipo.toLowerCase()}` : "Digite o valor do contato"}
                            errorNomeMessage={getFieldError(index, "nome")}
                            errorTipoMessage={getFieldError(index, "tipo")}
                            errorValorMessage={getFieldError(index, "valor")}
                            opcoesDeContato={opcoesDeContato}
                            podeMarcarComoPreferencial={!contatos.some(c => c.preferencial) || contato.preferencial}
                        />
                        {allowRemove && contatos.length > 1 && (
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-sm text-red-600 hover:text-red-700"
                                onClick={() => handleRemove(index)}
                            >
                                Remover
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {allowAdd && (
                <div className="mt-2 flex justify-end">
                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700"
                        onClick={handleAdd}
                    >
                        + Adicionar contato
                    </button>
                </div>
            )}
        </div>
    );
};
