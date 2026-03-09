import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../services/auth.service"

export const useAuth = () => {
    const mutationLogin = useMutation({
        mutationFn: AuthService.signIn,
        onError: () => {
        }
    });

    const mutationLogout = useMutation({
        mutationFn: AuthService.logOut
    });

    const mutationRecuperarSenha = useMutation({
        mutationFn: AuthService.recuperarSenha
    });

    const mutationValidarPin = useMutation({
        mutationFn: AuthService.validarPin
    })

    return {
        mutationLogin,
        mutationLogout,
        mutationRecuperarSenha,
        mutationValidarPin
    }
}