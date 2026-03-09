import { CustomCard } from "../../../shared/components/custom.card"

export const CardLogin = ({children} : {children: React.ReactNode}) => {
    return (
        <CustomCard>
            <h2 className={'text-3xl text-blue-950'}>ICare pet software</h2>
            <span className="h-[50px] text-xl">Seja bem-vindo de volta</span>
            {children}
            <span className="text-lg text-blue-600 self-end">
                <a href="/recuperar-senha">Esqueceu a senha?</a>
            </span>
        </CustomCard>
    )
}