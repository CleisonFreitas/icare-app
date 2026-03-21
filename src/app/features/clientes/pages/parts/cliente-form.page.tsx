import { FormCliente } from "../../components/form-cliente"
import type { ClienteType } from "../../types/cliente.type"
import { useClientePage } from "../../contexts/cliente-page.context"
import { useCliente } from "../../hooks/cliente.hook"
import { ExceptionEnum } from "@/app/shared/enums/exception.enum"
import { useState } from "react"
import { mapValidationErrors } from "@/app/shared/util/map.validation.errors"
import { TextButton } from "@/app/shared/components/text.button"
import { FaArrowAltCircleLeft } from "react-icons/fa"

export const ClienteFormPage = () => {
  const { selectedClient, closeForm } = useClientePage();
  const { create, update } = useCliente();
  const initialErrors: Partial<ClienteType> = {
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

  const [errors, setErrors] = useState<Partial<ClienteType>>(initialErrors);

  const applyValidationErrors = (error: any) => {
    if (error.type === ExceptionEnum.Validation) {
      const formatted = mapValidationErrors(initialErrors, error.errors);
      setErrors(formatted);
    }
  };

  const handleSubmit = (data: ClienteType) => {
    setErrors(initialErrors);

    if (data.id) {
      update.mutate(data, {
        onSuccess: () => closeForm(),
        onError: applyValidationErrors,
      });
    } else {
      create.mutate(data, {
        onSuccess: () => closeForm(),
        onError: applyValidationErrors,
      });
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <span className="w-full md:w-auto flex justify-start self-start">
        <TextButton icon={<FaArrowAltCircleLeft />} onClick={closeForm}>Retornar</TextButton>
      </span>

      <FormCliente
        initialData={selectedClient as ClienteType | undefined}
        onSubmit={handleSubmit}
        isLoading={create.isPending || update.isPending}
        errors={errors}
      />
    </div>
  )
}
