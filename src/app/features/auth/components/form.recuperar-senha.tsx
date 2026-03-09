import { useState, type SyntheticEvent } from "react";
import { CustomInput } from "../../../shared/components/custom.input"
import { useAuth } from "../hooks/use.auth.hook";
import type { RecuperarSenhaType } from "../types/auth.recuperar-senha.type";
import { ExceptionEnum } from "../../../shared/enums/exception.enum";
import { mapValidationErrors } from "../../../shared/util/map.validation.errors";
import { ButtonLoading } from "../../../shared/components/button.loading";
import { useNavigate } from "react-router-dom";

export const FormRecuperarSenha = () => {
    const initialData: RecuperarSenhaType = {
        email: ""
    }
    const [form, setForm] = useState<RecuperarSenhaType>(initialData);

    const [errors, setErrors] = useState<RecuperarSenhaType>(initialData);

    const { mutationRecuperarSenha } = useAuth();

    const navigate = useNavigate();


    const handleSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors(initialData);
        mutationRecuperarSenha.mutate(form, {
            onError: (error: any) => {
                if (error.type === ExceptionEnum.Validation) {
                    const formattedErrors = mapValidationErrors(initialData, error.errors);
                    setErrors(formattedErrors);
                }
            },
            onSuccess() {
                navigate("/registrar-codigo", { replace: true, state: { email: form.email } });
            },
        })
    }

    return (
        <form
            method="POST"
            onSubmit={handleSubmitForm}
            className="flex flex-col gap-12 w-full h-full">
            <CustomInput
                id="email"
                label="Email"
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Digite um email para receber o código de recuperação"
                errorMessage={errors.email}
            />
            <div className="w-full flex self-end mb-8">
                <ButtonLoading isLoading={mutationRecuperarSenha.isPending}>
                    Enviar código
                </ButtonLoading>
            </div>
        </form>
    )
}