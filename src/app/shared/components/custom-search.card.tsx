import { LuFileSearch } from "react-icons/lu"

export const CustomSearchCard = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
        <div className={
            `rounded-xl
            shadow-blue-950
            bg-white
            shadow-sm
            drop-shadow-md
            p-4
            border-l-[10px]
            border-l-blue-600
            min-h-full
            min-w-full
            flex
            flex-col
            gap-4
            justify-center
            items-center`
        }>
            <div className="flex items-center justify-between w-full border-b-2 border-gray-300 pb-4">
                <h2 className="text-xl">{title}</h2>
                <span className="text-2xl text-gray-600">
                    <LuFileSearch />
                </span>
            </div>
            {children}
        </div>
    )
}