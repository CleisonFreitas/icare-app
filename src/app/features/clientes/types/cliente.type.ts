import type { DateLogType } from "../../../core/types/date-log.type";

export type ClienteType = {
    id?: number;
    nome: string;
    email: string;
    documento: string;
    senha?: string;
    timestamps: DateLogType
}