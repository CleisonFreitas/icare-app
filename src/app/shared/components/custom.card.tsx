export const CustomCard = ({children} : {children: React.ReactNode}) => {
    return (
        <div className={
            `rounded-xl
            shadow-blue-950
            bg-white
            shadow-sm
            border-none
            drop-shadow-md
            p-4
            min-h-full
            min-w-full
            flex
            flex-col
            gap-4
            justify-center
            items-center`
        }>
            {children}
        </div>
    )
}