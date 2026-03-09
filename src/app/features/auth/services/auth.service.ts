import { ApiConfig } from "../../../core/api/api.config";
import type { AuthFormType } from "../types/auth.form.type";
import type { RecuperarSenhaType } from "../types/auth.recuperar-senha.type";
import type { AuthResponseType } from "../types/auth.response.type";
import type { ValidarPinType } from "../types/auth.validar-pin.type";

export const AuthService = {
    signIn: async (loginData : AuthFormType) => {
        const { data } = await ApiConfig.post('/administrador/login', loginData);
        return data;
    },

    logOut: async (): Promise<AuthResponseType> => {
        return await ApiConfig
            .post('/administrador/logout')
            .then(resposta => resposta.data);
    },

    me: async (): Promise<AuthResponseType> => {
        return await ApiConfig.get('/administrador/me')
            .then((res) => res.data);
    },

    recuperarSenha: async (recupararSenhaData: RecuperarSenhaType): Promise<void> => {
        return await ApiConfig.post('/administrador/gerar-pin', recupararSenhaData)
            .then((res) => res.data);
    },

    validarPin: async (pinData: ValidarPinType): Promise<void> => {
        return await ApiConfig.post('/administrador/validar-pin', pinData);
    }
}