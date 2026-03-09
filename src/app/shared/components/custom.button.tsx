export const CustomButton = ({ children } : { children: React.ReactNode }) => {
    return (
        <button
            type="submit"
            className={`
                rounded-lg
                bg-blue-950
                text-white
                text-md
                w-full
                p-4`
            }>
                { children }
        </button>
    )
}