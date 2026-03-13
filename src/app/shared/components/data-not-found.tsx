import { FaMagnifyingGlass } from "react-icons/fa6"

export const DataNotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <span className="text-4xl text-gray-400">
                <FaMagnifyingGlass />
            </span>
            <p className="text-xl text-gray-400">Nenhum resultado encontrado!</p>
        </div>
    )
}