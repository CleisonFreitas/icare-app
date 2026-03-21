import type { JSX } from "react";

export const CustomButton = ({
    children,
    icon,
    onClick,
    size,
}: {
    children: React.ReactNode;
    icon?: JSX.Element;
    onClick?: () => void;
    size?: "small" | "medium" | "large";
}) => {
    const sizesAvaible = {
        small: "h-4",
        medium: "h-9",
        large: "h-12",
    };
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
                p-4
                ${sizesAvaible[size || "large"]}
            `}
        >
            <span className="text-2xl">{icon}</span>
            <span className="text-lg">{children}</span>
        </button>
    );
};
