import { useState, type SyntheticEvent } from "react"
import { CustomInput } from "../../../shared/components/custom.input"
import type { AuthFormType } from "../types/auth.form.type";
import { useAuth } from "../hooks/use.auth.hook";
import { ExceptionEnum } from "../../../shared/enums/exception.enum";
import { mapValidationErrors } from "../../../shared/util/map.validation.errors";
import { ButtonLoading } from "../../../shared/components/button.loading";
import type { AuthResponseType } from "../types/auth.response.type";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/app/shared/contexts/auth.context";


export const FormLogin = () => {
    const initialData: AuthFormType = {
        email: "",
        senha: ""
    }
    const [form, setForm] = useState<AuthFormType>(initialData);

    const [errors, setErrors] = useState<AuthFormType>(initialData);

    const { mutationLogin,  } = useAuth();

    const navigate = useNavigate();

    const { login } = useAuthContext();

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors(initialData);
        mutationLogin.mutate(form, {
            onError: (error: any) => {
                if (error.type === ExceptionEnum.Validation) {
                    const formatted = mapValidationErrors(initialData, error.errors);
                    setErrors(formatted);
                }
            },
            onSuccess: (response: AuthResponseType) => {
                login(response.usuario, response.token);
                navigate("/", { replace: true})
            }
        });
    }
    return (
        <form
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full">
            <CustomInput
                id="email"
                label="Email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Digite um email válido"
                errorMessage={errors.email}
            />
            <CustomInput
                id="senha"
                label="Senha"
                value={form.senha}
                onChange={(e) => setForm(prev => ({ ...prev, senha: e.target.value }))}
                placeholder="*********"
                errorMessage={errors.senha}
            />
            <div className="w-full flex self-end mb-8 mt-8">
                <ButtonLoading isLoading={mutationLogin.isPending}>
                    Log In
                </ButtonLoading>
            </div>
        </form>
    )
}