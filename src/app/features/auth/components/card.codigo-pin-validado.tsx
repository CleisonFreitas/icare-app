import { useNavigate } from "react-router-dom"
import { CustomCard } from "../../../shared/components/custom.card"
import { FaCheckCircle } from "react-icons/fa";
import { Loading } from "../../../shared/components/small.loading";
import { useEffect } from "react";

export const CardCodigoPinValidado = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login", { replace: true });
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <CustomCard>
            <h2 className={'text-3xl text-blue-950'}>ICare pet software</h2>
            <span className="h-[50px] text-xl">Código validado com sucesso!</span>
            <span className="h-56"><FaCheckCircle className="w-full h-full text-blue-950" /></span>
            <div className="mt-8 text-gray-500 flex flex-col gap-4 items-center">
                <h3 className="text-xl text-center text-gray-700">Uma nova senha foi enviada por email</h3>
                <span className="flex gap-2">
                    <Loading size="sm" />
                    <p className="text-blue-950">Redirecionando...</p>
                </span>
            </div>
        </CustomCard>
    )
}