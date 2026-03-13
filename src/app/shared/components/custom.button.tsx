import type { JSX } from "react"

export const CustomButton = ({
    children,
    icon,
    onClick
}: {
    children: React.ReactNode,
    icon?: JSX.Element,
    onClick?: () => void
}) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className={`
                rounded-lg
                flex
                gap-4
                justify-center
                items-center
                bg-orange-500
                text-white
                w-full
                h-12
                p-4`
            }>
            <span className="text-2xl">{icon}</span>
            <span className="text-lg">{children}</span>
        </button>
    )
}