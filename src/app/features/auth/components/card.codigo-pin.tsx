import { CustomCard } from "../../../shared/components/custom.card"

export const CardCodigoPin = ({children} : {children: React.ReactNode}) => {
    return (
        <CustomCard>
            <h2 className={'text-3xl text-blue-950'}>ICare pet software</h2>
            <span className="h-[50px] text-xl">Digitar código pin</span>
                {children}
        </CustomCard>
    )
}