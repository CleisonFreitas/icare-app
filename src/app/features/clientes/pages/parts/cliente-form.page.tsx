import { FormCliente } from "../../components/form-cliente"
import { CustomButton } from "@/app/shared/components/custom.button"
import type { ClienteType } from "../../types/cliente.type"
import { useClientePage } from "../../contexts/cliente-page.context"
import { IoArrowBackCircle } from "react-icons/io5"
import { useCliente } from "../../hooks/cliente.hook"

export const ClienteFormPage = () => {
  const { selectedClient, closeForm } = useClientePage();
  const { create, update } = useCliente();

  const handleSubmit = (data: ClienteType) => {
    console.log("dados do formulário", data);
    if (data.id) {
      update.mutate(data);
    } else {
      create.mutate(data);
    }

    if (create.isSuccess || update.isSuccess) {
      closeForm();
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <span className="w-full md:w-auto flex justify-start self-start">
        <CustomButton onClick={closeForm} icon={<IoArrowBackCircle />}>Retornar à listagem</CustomButton>
      </span>

      <FormCliente
        initialData={selectedClient as ClienteType | undefined}
        onSubmit={handleSubmit}
        isLoading={create.isPending || update.isPending}
      />
    </div>
  )
}
