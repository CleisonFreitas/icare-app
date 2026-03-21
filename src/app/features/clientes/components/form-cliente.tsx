import { ButtonLoading } from "@/app/shared/components/button.loading"
import { CustomCard } from "@/app/shared/components/custom.card"
import { CustomInput } from "@/app/shared/components/custom.input"
import type { OptionType } from "@/app/shared/types/option.type"
import { useEffect, useState } from "react"
import type { ContatoType } from "../types/contato.type"
import type { EnderecoType } from "../types/endereco.type"
import { FaSave } from "react-icons/fa"
import type { ClienteType } from "../types/cliente.type"
import { ContatosEditor, validateContatos, type ContatoErrorType, type ContatosValidationErrors } from "./contatos-editor"
import { useViaCepHook } from "@/app/shared/hooks/use.via-cep.hook"
import { getNumber } from "@/app/shared/util/get-number.helper"
import { maskerHelper } from "@/app/shared/util/masker.helper"

export type ClienteErrorType = {
    nome?: string;
    email?: string;
    documento?: string;
    data_nascimento?: string;
    senha?: string;
    endereco?: Partial<Record<keyof EnderecoType, string>>;
    contatos?: ContatoErrorType[];
    geral?: string;
};

export type FormClienteProps = {
    initialData?: ClienteType;
    onSubmit?: (payload: any) => void;
    isLoading?: boolean;
    errors?: Partial<ClienteType>;
};

export const FormCliente = ({ initialData, onSubmit, isLoading, errors }: FormClienteProps) => {
    const defaultFormData: ClienteType = initialData || {
        nome: "",
        email: "",
        documento: "",
        data_nascimento: "",
        senha: "",
        endereco: {
            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
        },
        contatos: [
            { nome: "", tipo: "", valor: "", preferencial: false },
            { nome: "", tipo: "", valor: "", preferencial: false }
        ]
    };

    const [formData, setFormData] = useState<ClienteType>(defaultFormData);
    const [contatos, setContatos] = useState<ContatoType[]>(defaultFormData.contatos);
    const [validationErrors, setValidationErrors] = useState<ClienteErrorType>({});
    const [isFetchingCep, setIsFetchingCep] = useState(false);
    const [cepError, setCepError] = useState<string | null>(null);
    const { getByCep } = useViaCepHook();

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setContatos(initialData.contatos || []);
            setValidationErrors({});
        }
    }, [initialData]);

    const getFieldError = (field: string, subField?: string, index?: number): string | undefined => {
        const serverError = errors as ClienteErrorType | undefined;

        if (subField && index !== undefined) {
            const custom = validationErrors.contatos?.[index]?.[subField as keyof ContatoErrorType];
            const server = serverError?.contatos?.[index]?.[subField as keyof ContatoErrorType];
            return custom || server;
        }

        if (subField) {
            const custom = (validationErrors as any)[subField];
            const server = (serverError as any)?.[subField];
            return custom || server;
        }

        const custom = (validationErrors as any)[field];
        const server = (serverError as any)?.[field];
        return custom || server;
    };

    const isValidEmail = (email: string) => /^(?:[^@\s]+@[^@\s]+\.[^@\s]+)$/.test(email);

    const hasValidationErrors = (err: ClienteErrorType): boolean => {
        if (err.geral) return true;
        if (err.nome || err.email || err.documento || err.data_nascimento || err.senha) return true;
        if (err.endereco && Object.keys(err.endereco).length > 0) return true;
        if (err.contatos && err.contatos.some(c => c && Object.keys(c).length > 0)) return true;
        return false;
    };

    const validateForm = () => {
        const newErrors: ClienteErrorType = {};

        if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";

        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório";
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = "Email inválido";
        }

        if (!formData.documento.trim()) newErrors.documento = "Documento é obrigatório";

        if (!formData.data_nascimento.trim()) newErrors.data_nascimento = "Data de nascimento é obrigatória";

        if (!formData.id && !formData.senha?.trim()) newErrors.senha = "Senha é obrigatória";

        const enderecoErrors: Partial<Record<keyof EnderecoType, string>> = {};

        if (!formData.endereco.cep.trim()) enderecoErrors.cep = "CEP é obrigatório";
        if (!formData.endereco.logradouro.trim()) enderecoErrors.logradouro = "Logradouro é obrigatório";
        if (!formData.endereco.numero.trim()) enderecoErrors.numero = "Número é obrigatório";
        if (!formData.endereco.bairro.trim()) enderecoErrors.bairro = "Bairro é obrigatório";
        if (!formData.endereco.cidade.trim()) enderecoErrors.cidade = "Cidade é obrigatória";
        if (!formData.endereco.uf.trim()) enderecoErrors.uf = "UF é obrigatório";

        if (Object.keys(enderecoErrors).length > 0) newErrors.endereco = enderecoErrors;

        const contatosValidation = validateContatos(contatos);

        if (!contatosValidation.isValid) {
            newErrors.geral = contatosValidation.errors.geral;
            newErrors.contatos = contatosValidation.errors.contatos;
        }

        setValidationErrors(newErrors);

        return !hasValidationErrors(newErrors);
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        const contatosValidos = validateContatos(contatos).contatosValidos;
        setFormData(prev => ({ ...prev, contatos: contatosValidos }));

        const payload = { ...formData, contatos: contatosValidos };
        if (onSubmit) onSubmit(payload);
    }

    const handleContatosChange = (novoContatos: ContatoType[]) => {
        setContatos(novoContatos);
        setFormData(prev => ({ ...prev, contatos: novoContatos }));
    }

    const opcoesDeContato: OptionType[] = [
        { type: "text", label: "Email", value: "EMAIL" },
        { type: "text", label: "Telefone", value: "TELEFONE" }
    ];

    const contatoFieldErrors: ContatosValidationErrors = {
        geral: getFieldError("geral"),
        contatos: (() => {
            const serverErrors = (errors as ClienteErrorType)?.contatos || [];
            const clientErrors = validationErrors.contatos || [];
            const max = Math.max(serverErrors.length, clientErrors.length);
            return Array.from({ length: max }, (_, i) => ({
                ...(serverErrors[i] || {}),
                ...(clientErrors[i] || {}),
            }));
        })(),
    };

    const gerarEndereco = async () => {
        const cep = getNumber(formData.endereco.cep);
        setIsFetchingCep(true);
        const endereco = await getByCep(cep);
        if (endereco.logradouro === undefined) {
            setCepError("Cep informado não encontrado");
        }
        setIsFetchingCep(false);
        setFormData({
                ...formData,
                endereco: {
                    ...formData.endereco,
                    logradouro: endereco.logradouro || formData.endereco.logradouro,
                    bairro: endereco.bairro || formData.endereco.bairro,
                    cidade: endereco.cidade || formData.endereco.cidade,
                    uf: endereco.uf || formData.endereco.uf,
                    numero: "",
                    complemento: "",
                },
            });

        setCepError(null);
    };

    return (
        <CustomCard>
            <form action="POST" onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
                {getFieldError("geral") && (
                    <div className="rounded-md bg-red-100 border border-red-300 p-3 text-red-700">
                        {getFieldError("geral")}
                    </div>
                )}
                {/* Nome, Data de nascimento e Documento */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
                    <span className="col-span-2">
                        <CustomInput
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            label="Nome"
                            id="nome"
                            defaultValue={formData?.nome}
                            placeholder="Digite o nome completo"
                            required
                            errorMessage={getFieldError("nome")}
                        />
                    </span>
                    <span className="col-span-1 grid grid-cols-1 md:grid-cols-2 w-full gap-2">
                        <CustomInput
                            onChange={(e) => setFormData({ ...formData, data_nascimento: e.target.value })}
                            label="Data de nascimento"
                            id="data_nascimento"
                            type={"date"}
                            defaultValue={formData?.data_nascimento}
                            errorMessage={getFieldError("data_nascimento")}
                            required
                        />
                        <CustomInput
                            onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                            label="Documento"
                            id="documento"
                            defaultValue={formData.documento}
                            placeholder="Digite o CPF do cliente"
                            errorMessage={getFieldError("documento")}
                            required
                        />
                    </span>
                </div>
                {/* Email e Senha */}
                <div className="grid grid-cols-1 md:grid-cols-[calc(70%-0.5rem)_calc(30%-0.5rem)] gap-2">
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        label="Email"
                        id="email"
                        type="email"
                        defaultValue={formData.email}
                        placeholder="Digite o email do cliente"
                        errorMessage={getFieldError("email")}
                        required
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                        label="Senha"
                        id="senha"
                        type="password"
                        defaultValue={formData.senha}
                        placeholder="Digite a senha do cliente"
                        errorMessage={getFieldError("senha")}
                        required
                    />
                </div>

                {/* Telefone e Endereço */}
                <h3 className="text-md font-semibold border-b-2 pb-2">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-[calc(30%-0.5rem)_calc(60%-0.5rem)_calc(10%-0.5rem)] gap-2">
                    <CustomInput
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                endereco:
                                {
                                    ...formData.endereco,
                                    cep: maskerHelper.cep(e.target.value)
                                }
                            })}
                        label="CEP"
                        onBlur={gerarEndereco}
                        id="cep"
                        maxLength={9}
                        value={formData.endereco.cep}
                        placeholder="Digite o CEP do cliente"
                        errorMessage={cepError || getFieldError("endereco", "cep")}
                        required
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, logradouro: e.target.value } })}
                        label="Endereço"
                        id="endereco"
                        value={formData.endereco.logradouro}
                        placeholder="Digite o Endereço do cliente"
                        errorMessage={getFieldError("endereco", "logradouro")}
                        isLoading={isFetchingCep}
                        required
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, numero: e.target.value } })}
                        label="Número"
                        id="numero"
                        value={formData.endereco.numero}
                        placeholder="Digite o número do endereço"
                        errorMessage={getFieldError("endereco", "numero")}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[calc(20%-0.5rem)_calc(20%-0.5rem)_calc(20%-0.5rem)_calc(20%-0.5rem)_calc(20%-0.5rem)] gap-2">
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, complemento: e.target.value } })}
                        label="Complemento"
                        id="complemento"
                        value={formData?.endereco.complemento}
                        placeholder="Digite o complemento do endereço"
                        errorMessage={getFieldError("endereco", "complemento")}
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, bairro: e.target.value } })}
                        label="Bairro"
                        id="bairro"
                        value={formData?.endereco.bairro}
                        placeholder="Digite o bairro do cliente"
                        errorMessage={getFieldError("endereco", "bairro")}
                        required
                        isLoading={isFetchingCep}
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, cidade: e.target.value } })}
                        label="Cidade"
                        id="cidade"
                        value={formData?.endereco.cidade}
                        placeholder="Digite a cidade do cliente"
                        errorMessage={getFieldError("endereco", "cidade")}
                        required
                        isLoading={isFetchingCep}
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, uf: e.target.value } })}
                        label="UF"
                        id="uf"
                        value={formData?.endereco.uf}
                        placeholder="UF"
                        errorMessage={getFieldError("endereco", "uf")}
                        required
                        isLoading={isFetchingCep}
                    />
                </div>

                <h3 className="text-md font-semibold border-b-2 pb-2">Telefones</h3>
                <ContatosEditor
                    contatos={contatos}
                    onChange={handleContatosChange}
                    errors={contatoFieldErrors}
                    opcoesDeContato={opcoesDeContato}
                    showHeading={false}
                />
                <span className="justify-self-end self-end w-full md:w-[200px]">
                    <ButtonLoading isLoading={isLoading || false} size="medium" icon={<FaSave />}>
                        Salvar
                    </ButtonLoading>
                </span>

            </form>
        </CustomCard>
    );
}