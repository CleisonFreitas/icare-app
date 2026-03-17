import { CustomCard } from "@/app/shared/components/custom.card"
import type { ClienteType } from "../types/cliente.type";
import { maskerHelper } from "@/app/shared/util/masker.helper";
import { TextButton } from "@/app/shared/components/text.button";
import { FaUserEdit } from "react-icons/fa";
import { RiFileEditFill } from "react-icons/ri";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CustomInput } from "@/app/shared/components/custom.input";
import { useEffect, useState } from "react";
import { ButtonLoading } from "@/app/shared/components/button.loading";
import { useCliente } from "../hooks/cliente.hook";
import { ExceptionEnum } from "@/app/shared/enums/exception.enum";
import { mapValidationErrors } from "@/app/shared/util/map.validation.errors";
import { Loading } from "@/app/shared/components/small.loading";
import { getNumber } from "@/app/shared/util/get-number.helper";
import type { EnderecoType } from "../types/endereco.type";
import type { ContatoType } from "../types/contato.type";
import { ContatosEditor, validateContatos, type ContatosValidationErrors } from "./contatos-editor";

export const DetalhesCliente = ({ cliente }: { cliente?: ClienteType }) => {
    const { update, updateClientAddress, updateClientContacts } = useCliente();
    const [clienteData, setClienteData] = useState<ClienteType | undefined>(cliente);
    const [enderecoData, setEnderecoData] = useState<EnderecoType | undefined>(cliente?.endereco);
    const [contatoData, setContatoData] = useState<ContatoType[] | undefined>(cliente?.contatos);
    const [errorsInformacoes, setErrorsInformacoes] = useState<Record<string, string>>({
        nome: "",
        email: "",
        documento: "",
        data_nascimento: ""
    });
    const [errorsEndereco, setErrorsEndereco] = useState<Record<string, string>>({
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
    });

    const [errorsContatos, setErrorsContatos] = useState<ContatosValidationErrors>({
        geral: "",
        contatos: [],
    });

    const handleInformacoesUpdate = (
        cliente: Partial<ClienteType>,
        onSuccess?: () => void
    ) => {
        update.mutate(cliente, {
            onError: (error: any) => {
                if (error.type === ExceptionEnum.Validation) {
                    const formatted = mapValidationErrors(errorsInformacoes, error.errors);
                    setErrorsInformacoes(formatted);
                }
            },
            onSuccess: (data: ClienteType) => {
                setClienteData(data);
                onSuccess?.();
            },
        });
    }

    const handleEnderecoCliente = (
        endereco: EnderecoType,
        onSuccess?: () => void
    ) => {
        updateClientAddress.mutate(endereco, {
            onError: (error: any) => {
                if (error.type === ExceptionEnum.Validation) {
                    const formatted = mapValidationErrors(errorsEndereco, error.errors);
                    setErrorsEndereco(formatted);
                }
            },
            onSuccess: (data: EnderecoType) => {
                setEnderecoData(data);
                onSuccess?.();
            },
        });
    }

    const handleContatosUpdate = (
        contatos: ContatoType[],
        onSuccess?: () => void
    ) => {

        updateClientContacts.mutate(contatos, {
            onError: (error: any) => {
                if (error.type === ExceptionEnum.Validation) {
                    const formatted = mapValidationErrors(errorsContatos, error.errors);
                    setErrorsContatos(formatted);
                }
            },
            onSuccess: (data: ContatoType[]) => {
                setContatoData(data);
                onSuccess?.();
            },
        });
    }

    return (
        <CustomCard>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-start items-start flex-col md:flex-row w-full">
                <div className="col-start-1 col-end-1 flex flex-col gap-2 w-full p-4">
                    <div className="flex justify-between items-center border-b-2 pb-1">
                        <h2 className="text-sm font-bold text-orange-500">#Informações</h2>
                        {clienteData
                            &&
                            <InformacoesCliente
                                cliente={clienteData!}
                                onUpdate={handleInformacoesUpdate}
                                isLoading={update.isPending}
                                errors={errorsInformacoes}
                            />
                        }
                    </div>
                    {
                        update.isPending
                            ? <Loading />
                            : <>
                                <div className="flex flex-col md:flex-row gap-4 w-full">
                                    <span className="flex gap-2 flex-col md:flex-row justify-start items-start text-gray-800 text-sm">
                                        <p className="font-bold">Nome:</p>
                                        <p>{clienteData?.nome}</p>
                                    </span>
                                    <span className="flex gap-2 flex-col md:flex-row justify-start items-start text-gray-800 text-sm">
                                        <p className="font-bold">Documento:</p>
                                        <p>{maskerHelper.cpf(clienteData?.documento || '')}</p>
                                    </span>
                                </div>
                                <span className="flex gap-2 flex-col md:flex-row justify-start items-start text-gray-800 text-sm">
                                    <p className="font-bold">Email:</p>
                                    <p>{clienteData?.email}</p>
                                </span>
                                <div className="flex flex-col md:flex-row gap-2 items-start">
                                    <span className="flex gap-2 flex-col md:flex-row justify-start items-start text-gray-800 text-sm">
                                        <p className="font-bold">Data de Nascimento:</p>
                                        <p>{maskerHelper.data(clienteData?.data_nascimento || '')}</p>
                                    </span>
                                </div>
                            </>
                    }
                    <div className="mt-2 flex flex-col items-start gap-2">
                        <div className="flex justify-between items-center border-b-2 pb-1 w-full">
                            <h2 className="text-sm font-bold text-orange-500">#Endereço</h2>
                            {enderecoData
                                &&
                                <InformacoesEndereco
                                    clienteId={cliente?.id}
                                    endereco={enderecoData}
                                    onUpdateEndereco={handleEnderecoCliente}
                                    errors={errorsEndereco}
                                    isLoading={updateClientAddress.isPending}
                                />
                            }
                        </div>

                        <p className="text-sm text-gray-900">
                            <span className="font-bold mr-1">CEP:</span> {maskerHelper.cep(cliente?.endereco?.cep || '')}
                        </p>
                        <p className="text-sm text-gray-900">
                            <span className="font-bold mr-1">Logradouro:</span> {enderecoData?.logradouro}
                        </p>
                        <p className="text-sm text-gray-900">
                            <span className="font-bold mr-1">Número:</span> {enderecoData?.numero}
                        </p>
                        <p className="text-sm text-gray-900">
                            <span className="font-bold mr-1">Bairro:</span> {enderecoData?.bairro}
                        </p>
                        <p className="text-sm text-gray-900">
                            <span className="font-bold mr-1">Cidade:</span> {enderecoData?.cidade}
                        </p>
                        <p className="text-sm text-gray-900">
                            <span className="font-bold mr-1">Estado:</span> {enderecoData?.uf}
                        </p>
                    </div>
                </div>
                <div className="col-span-1 md:col-start-2 md:col-end-2 p-4 flex flex-col">
                    <div className="flex justify-between items-center border-b-2 pb-1 w-full">
                        <h2 className="text-sm font-bold text-orange-500">#Contatos</h2>
                        {contatoData && (
                            <InformacoesContato
                                clienteId={cliente?.id}
                                contatos={contatoData}
                                onUpdateContatos={handleContatosUpdate}
                                isLoading={updateClientContacts.isPending}
                                errors={errorsContatos}
                            />
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between mt-2 gap-4">
                        {clienteData?.contatos.map((contato, index) => (
                            <div className="flex flex-col justify-start gap-2 text-sm" key={index}>
                                <span className="flex gap-2 items-center text-gray-800">
                                    <p className="font-bold">Nome do {index == 0 ? "primeiro" : "segundo"} contato: </p>
                                    <p className="text-wrap">{contato.nome}</p>
                                </span>
                                <span className="flex gap-2 items-center text-gray-800">
                                    <p className="font-bold">Tipo: </p>
                                    <p className="text-wrap first-letter:uppercase">{contato.tipo.toLowerCase()}</p>
                                </span>
                                <span className="flex gap-2 items-center text-gray-800">
                                    <p className="font-bold">Valor: </p>
                                    <p className="text-wrap">{contato.valor}</p>
                                </span>
                                {contato.preferencial && <p className="font-bold text-orange-500 text-xs">Preferêncial </p>}
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </CustomCard>
    )
}

const InformacoesCliente = ({
    cliente,
    onUpdate,
    isLoading = false,
    errors,
}: {
    cliente: ClienteType
    onUpdate: (
        cliente: Partial<ClienteType>,
        onSucces: () => void
    ) => void;
    isLoading?: boolean;
    errors: Record<string, string>
}) => {

    const [open, setOpen] = useState(false)

    const [clienteAtualizado, setClienteAtualizado] = useState<Partial<ClienteType>>({
        id: cliente.id,
        nome: cliente.nome,
        documento: cliente.documento,
        email: cliente.email,
        data_nascimento: cliente.data_nascimento
    })

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        onUpdate(clienteAtualizado, () => {
            setOpen(false);
        });
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <TextButton icon={<FaUserEdit />}>Editar</TextButton>
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="text-orange-500 font-bold text-md">
                        Editar informações pessoais
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <CustomInput
                        label="Nome:"
                        value={clienteAtualizado.nome}
                        maxLength={255}
                        onChange={(e) =>
                            setClienteAtualizado({ ...clienteAtualizado, nome: e.target.value })
                        }
                        errorMessage={errors.nome}
                    />

                    <CustomInput
                        label="Documento:"
                        value={maskerHelper.cpf(clienteAtualizado.documento as string)}
                        maxLength={14}
                        onChange={(e) =>
                            setClienteAtualizado({ ...clienteAtualizado, documento: getNumber(e.target.value) })
                        }
                    />

                    <CustomInput
                        label="Email:"
                        value={clienteAtualizado.email}
                        onChange={(e) =>
                            setClienteAtualizado({ ...clienteAtualizado, email: e.target.value })
                        }
                    />

                    <CustomInput
                        type="date"
                        label="Data de Nascimento:"
                        id="data_nascimento"
                        value={clienteAtualizado.data_nascimento}
                        onChange={(e) =>
                            setClienteAtualizado({
                                ...clienteAtualizado,
                                data_nascimento: e.target.value
                            })
                        }
                    />

                    <ButtonLoading isLoading={isLoading}>Salvar</ButtonLoading>
                </form>
            </SheetContent>
        </Sheet>
    )
}

const InformacoesEndereco = ({
    clienteId,
    endereco,
    onUpdateEndereco,
    isLoading = false,
    errors,
}: {
    clienteId?: number,
    endereco: EnderecoType
    onUpdateEndereco: (
        endereco: EnderecoType,
        onSucces: () => void
    ) => void;
    isLoading?: boolean;
    errors: Record<string, string>
}) => {
    const [open, setOpen] = useState(false)
    const [enderecoAtualizado, setEnderecoAtualizado] = useState<EnderecoType>({
        id: endereco.id,
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        uf: endereco.uf,
        clienteId: clienteId
    })

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        onUpdateEndereco(enderecoAtualizado, () => {
            setOpen(false);
        });
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <TextButton icon={<RiFileEditFill />}>Editar</TextButton>
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="text-orange-500 font-bold text-md">
                        Editar informações de endereço
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <CustomInput
                        label="CEP:"
                        value={maskerHelper.cep(enderecoAtualizado.cep)}
                        maxLength={10}
                        onChange={(e) =>
                            setEnderecoAtualizado({ ...enderecoAtualizado, cep: getNumber(e.target.value) })
                        }
                        errorMessage={errors.cep}
                    />

                    <CustomInput
                        label="Endereço:"
                        value={enderecoAtualizado.logradouro}
                        maxLength={255}
                        onChange={(e) =>
                            setEnderecoAtualizado({ ...enderecoAtualizado, logradouro: e.target.value })
                        }
                    />

                    <CustomInput
                        label="Número:"
                        value={enderecoAtualizado.numero}
                        maxLength={14}
                        onChange={(e) =>
                            setEnderecoAtualizado({ ...enderecoAtualizado, numero: e.target.value })
                        }
                    />

                    <CustomInput
                        label="Complemento:"
                        value={enderecoAtualizado.complemento}
                        maxLength={255}
                        onChange={(e) =>
                            setEnderecoAtualizado({ ...enderecoAtualizado, complemento: e.target.value })
                        }
                    />

                    <CustomInput
                        label="Bairro:"
                        value={enderecoAtualizado.bairro}
                        maxLength={255}
                        onChange={(e) =>
                            setEnderecoAtualizado({ ...enderecoAtualizado, bairro: e.target.value })
                        }
                    />

                    <CustomInput
                        label="Cidade:"
                        value={enderecoAtualizado.cidade}
                        maxLength={255}
                        onChange={(e) =>
                            setEnderecoAtualizado({ ...enderecoAtualizado, cidade: e.target.value })
                        }
                    />

                    <CustomInput
                        label="Uf:"
                        value={enderecoAtualizado.uf}
                        maxLength={2}
                        onChange={(e) =>
                            setEnderecoAtualizado({ ...enderecoAtualizado, uf: e.target.value })
                        }
                    />

                    <ButtonLoading isLoading={isLoading}>Salvar</ButtonLoading>
                </form>
            </SheetContent>
        </Sheet>
    )
}

const InformacoesContato = ({
    clienteId,
    contatos,
    onUpdateContatos,
    isLoading = false,
    errors,
}: {
    clienteId?: number;
    contatos: ContatoType[];
    onUpdateContatos: (
        contatos: ContatoType[],
        onSucces: () => void
    ) => void;
    isLoading?: boolean;
    errors?: ContatosValidationErrors;
}) => {
    const [open, setOpen] = useState(false);
    const [contatosAtualizados, setContatosAtualizados] = useState<ContatoType[]>(contatos);
    const [localErrors, setLocalErrors] = useState<ContatosValidationErrors>({
        geral: "",
        contatos: [],
    });

    useEffect(() => {
        setContatosAtualizados(contatos);
    }, [contatos]);

    const mergedErrors: ContatosValidationErrors = {
        geral: localErrors.geral || errors?.geral,
        contatos: (() => {
            const server = errors?.contatos || [];
            const local = localErrors.contatos || [];
            const max = Math.max(server.length, local.length);
            return Array.from({ length: max }, (_, i) => ({
                ...(server[i] || {}),
                ...(local[i] || {}),
            }));
        })(),
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validation = validateContatos(contatosAtualizados);
        if (!validation.isValid) {
            setLocalErrors(validation.errors);
            return;
        }
        const contatosAtualizacao = validation.contatosValidos.map((contato) => ({
            ...contato,
            clienteId
        }));
        onUpdateContatos(contatosAtualizacao, () => {
            setOpen(false);
            setLocalErrors({ geral: "", contatos: [] });
        });
    };

    const handleOpenChange = (value: boolean) => {
        setOpen(value);
        if (value) {
            setContatosAtualizados(contatos);
            setLocalErrors({ geral: "", contatos: [] });
        }
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <TextButton icon={<RiFileEditFill />}>Editar</TextButton>
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="text-orange-500 font-bold text-md">
                        Editar contatos
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <ContatosEditor
                        contatos={contatosAtualizados}
                        onChange={setContatosAtualizados}
                        errors={mergedErrors}
                        showHeading={false}
                        dir="vertical"
                    />
                    <ButtonLoading isLoading={isLoading}>Salvar</ButtonLoading>
                </form>
            </SheetContent>
        </Sheet>
    )
}