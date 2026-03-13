
interface GridItemProps {
    children: React.ReactNode
    cols?: number
    span?: number
    gap?: number
    minColSize?: string
}

export const GridItem = ({
    children,
    cols = 1,
    span = 1,
    gap = 1,
    minColSize = '100px'
}: GridItemProps) => {
    return (
        <div
            className="w-full grid auto-rows-auto"
            style={{
                gridTemplateColumns: `repeat(${cols}, minmax(${minColSize}, 1fr))`,
                gap: `${gap}rem`
            }}
        >
            <span className={`col-span-${span ?? 1}`}>
                {children}
            </span>
        </div>
    );
}