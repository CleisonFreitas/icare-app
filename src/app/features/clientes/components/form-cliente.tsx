import { ButtonLoading } from "@/app/shared/components/button.loading"
import { CustomCard } from "@/app/shared/components/custom.card"
import { CustomInput } from "@/app/shared/components/custom.input"
import { CustomSelect } from "@/app/shared/components/custom.select"
import type { OptionType } from "@/app/shared/types/option.type"
import { useState } from "react"
import type { ContatoType } from "../types/contato.type"
import { FaSave } from "react-icons/fa"
import type { ClienteType } from "../types/cliente.type"

export type FormClienteProps = {
    initialData?: ClienteType;
    onSubmit?: (payload: any) => void;
    isLoading?: boolean;
}

export const FormCliente = ({ initialData, onSubmit, isLoading }: FormClienteProps) => {
    const [formData, setFormData] = useState<ClienteType>(initialData || {
        nome: "",
        email: "",
        documento: "",
        data_nascimento: "",
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
    })
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const contatosValidos = formData.contatos.filter(c => c.tipo && c.valor)
        const payload = { ...formData, contatos: contatosValidos }

        if (onSubmit) onSubmit(payload);
    }

    const opcoesDeContato: OptionType[] = [
        { type: "text", label: "Email", value: "EMAIL" },
        { type: "text", label: "Telefone", value: "TELEFONE" }
    ];

    const [contatos, setContatos] = useState<ContatoType[]>(formData.contatos || [
        { nome: "", tipo: "", valor: "", preferencial: false },
        { nome: "", tipo: "", valor: "", preferencial: false }
    ])

    const getPlaceholder = (tipo: string): string => {
        switch (tipo) {
            case "email":
                return "Digite o seu email de contato"
            case "telefone":
                return "Digite seu telefone de contato"
            default:
                return "Digite aqui o contato"
        }
    }

    const handleSelectChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        const novoContatos = [...contatos]
        novoContatos[index].tipo = e.target.value
        setContatos(novoContatos)
    }

    const handleInputChange = (index: number, value: string) => {
        const novoContatos = [...contatos]
        novoContatos[index].valor = value
        setContatos(novoContatos)
    }

    const handleNomeContatoChange = (index: number, value: string) => {
        const novoContatos = [...contatos]
        novoContatos[index].nome = value
        setContatos(novoContatos)
    }

    const handleCheckboxChange = (index: number) => {
        const novoContatos = [...contatos]

        if (!novoContatos[index].preferencial) {
            novoContatos.forEach((contato, i) => {
                if (i !== index) {
                    contato.preferencial = false
                }
            })
        }

        novoContatos[index].preferencial = !novoContatos[index].preferencial
        setContatos(novoContatos)
    }

    const temContatoPrefencialMarcado = contatos.some(c => c.preferencial)

    return (
        <CustomCard>
            <form action="POST" onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
                {/* Nome, Data de nascimento e Documento */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
                    <span className="col-span-2">
                        <CustomInput
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            label="Nome"
                            id="nome"
                            defaultValue={formData?.nome}
                            placeholder="Digite o nome completo"
                        />
                    </span>
                    <span className="col-span-1 grid grid-cols-1 md:grid-cols-2 w-full gap-2">
                        <CustomInput
                            onChange={(e) => setFormData({ ...formData, data_nascimento: e.target.value })}
                            label="Data de nascimento"
                            id="data_nascimento"
                            type={"date"}
                            defaultValue={formData?.data_nascimento}
                        />
                        <CustomInput
                            onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                            label="Documento"
                            id="documento"
                            defaultValue={formData.documento}
                            placeholder="Digite o CPF do cliente"
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
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                        label="Senha"
                        id="senha"
                        type="password"
                        defaultValue={formData.senha}
                        placeholder="Digite a senha do cliente"
                    />
                </div>

                {/* Telefone e Endereço */}
                <h3 className="text-xl font-semibold">Endereço</h3>
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-[calc(30%-0.5rem)_calc(60%-0.5rem)_calc(10%-0.5rem)] gap-2">
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, cep: e.target.value } })}
                        label="CEP"
                        id="cep"
                        defaultValue={formData.endereco.cep}
                        placeholder="Digite o CEP do cliente"
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, logradouro: e.target.value } })}
                        label="Endereço"
                        id="endereco"
                        defaultValue={formData.endereco.logradouro}
                        placeholder="Digite o Endereço do cliente"
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, numero: e.target.value } })}
                        label="Número"
                        id="numero"
                        defaultValue={formData.endereco.numero}
                        placeholder="Digite o número do endereço"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[calc(20%-0.5rem)_calc(20%-0.5rem)_calc(20%-0.5rem)_calc(20%-0.5rem)_calc(20%-0.5rem)] gap-2">
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, complemento: e.target.value } })}
                        label="Complemento"
                        id="complemento"
                        defaultValue={formData?.endereco.complemento}
                        placeholder="Digite o complemento do endereço"
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, bairro: e.target.value } })}
                        label="Bairro"
                        id="bairro"
                        defaultValue={formData?.endereco.bairro}
                        placeholder="Digite o bairro do cliente"
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, cidade: e.target.value } })}
                        label="Cidade"
                        id="cidade"
                        defaultValue={formData?.endereco.cidade}
                        placeholder="Digite a cidade do cliente"
                    />
                    <CustomInput
                        onChange={(e) => setFormData({ ...formData, endereco: { ...formData.endereco, uf: e.target.value } })}
                        label="UF"
                        id="uf"
                        defaultValue={formData?.endereco.uf}
                        placeholder="UF"
                    />
                </div>

                <h3 className="text-xl font-semibold">Telefones</h3>
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-[calc(50%-0.5rem)_calc(50%-0.5rem)] gap-2">
                    {formData.contatos.map((contato, index) => (
                        <div key={index} className="flex flex-col gap-2 justify-center rounded-lg shadow shadow-gray-700 p-4">
                            <CustomInput
                                label={`Nome do contato ${index + 1}`}
                                onChange={(e) => handleNomeContatoChange(index, e.target.value)}
                                value={contato.nome}
                                placeholder={getPlaceholder(contato.tipo)}
                            />
                            <div className="flex justify-start items-center gap-2 flex-col md:flex-row">
                                <span className="w-full md:w-[250px]">
                                    <CustomSelect
                                        label={`Contato ${index + 1}`}
                                        id={`contato${index + 1}`}
                                        onChange={(e) => handleSelectChange(index, e)}
                                        value={contato.tipo}
                                        options={opcoesDeContato}
                                    />
                                </span>
                                <span className="w-full md:mt-7 mt-0">
                                    <CustomInput
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        value={contato.valor}
                                        placeholder={getPlaceholder(contato.tipo)}
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
                                    disabled={temContatoPrefencialMarcado && !contato.preferencial}
                                />
                            </span>
                        </div>
                    ))}
                </div>
                <span className="justify-self-end self-end w-full md:w-[200px]">
                    <ButtonLoading isLoading={isLoading || false} size="medium" icon={<FaSave />}>
                        Salvar
                    </ButtonLoading>
                </span>

            </form>
        </CustomCard>
    );
}