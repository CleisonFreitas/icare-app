export const getNumber = (value: string | undefined | null): string => {
    return value ? value.replace(/\D/g, "") : "";
};