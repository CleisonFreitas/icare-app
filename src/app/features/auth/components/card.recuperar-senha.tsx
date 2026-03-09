import { IoMdArrowRoundBack } from "react-icons/io"
import { CustomCard } from "../../../shared/components/custom.card"

export const CardRecuperarSenha = ({children} : {children: React.ReactNode}) => {
    return (
        <CustomCard>
            <h2 className={'text-3xl text-blue-950'}>ICare pet software</h2>
            <span className="h-[50px] text-xl">Recuperação de senha</span>
                {children}
            <span className="text-lg text-blue-600 self-end">
                <a href="/login" className="flex items-center gap-2"> <IoMdArrowRoundBack />Retornar à pagina anterior?</a>
            </span>
        </CustomCard>
    )
}