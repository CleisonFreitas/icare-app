export const TextButton = ({ children, onClick, icon }: { children: React.ReactNode, onClick?: () => void, icon?: React.ReactNode }) => {
    return (
        <button
            onClick={onClick}
            className="text-orange-500 transition-colors duration-200 font-medium flex justify-center items-center text-sm gap-1"
        >
            {icon}
            {children}
        </button>
    )
}