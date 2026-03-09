import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../features/auth/pages/login.page";
import { PrivateRoute } from "./private.route";
import { MainLayout } from "../../templates/main.layout";
import Home from "../../features/home/home";
import RecuperarSenhaPage from "../../features/auth/pages/recuperar-senha.page";
import RegistrarCodigoPage from "../../features/auth/pages/registar-codigo.page";
import CodigoConfirmadoPage from "../../features/auth/pages/codigo-confirmado.page";
import ClientePage from "@/app/features/clientes/pages/cliente.page";
import PetPage from "@/app/features/pets/pages/pet.page";
import ConsultaPage from "@/app/features/consultas/pages/consulta.page";
import VacinaPage from "@/app/features/vacinas/pages/vacina.page";
import HistoricoMedicoPage from "@/app/features/historico/pages/historico-medico.page";
import DashboardPage from "@/app/features/dashboard/pages/dashboard.page";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/recuperar-senha",
        element: <RecuperarSenhaPage />
    },
    {
        path: "/registrar-codigo",
        element: <RegistrarCodigoPage />
    },
    {
        path: "/codigo-confirmado",
        element: <CodigoConfirmadoPage />
    },
    {
        element: <PrivateRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "/dashboard",
                        element: <DashboardPage />,
                    },
                    {
                        path: "/clientes",
                        element: <ClientePage />,
                    },
                    {
                        path: "/pets",
                        element: <PetPage />,
                    },
                    {
                        path: "/consultas",
                        element: <ConsultaPage />,
                    },
                    {
                        path: "/vacinas",
                        element: <VacinaPage />,
                    },
                    {
                        path: "/historico-medico",
                        element: <HistoricoMedicoPage />,
                    },
                ]
            }
        ]
    },
]);