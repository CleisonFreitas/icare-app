import type { DateLogType } from "../../../core/types/date-log.type";
import type { ContatoType } from "./contato.type";
import type { EnderecoType } from "./endereco.type";

export type ClienteType = {
    id?: number;
    nome: string;
    email: string;
    documento: string;
    data_nascimento: string;
    senha?: string;
    endereco: EnderecoType;
    contatos: ContatoType[];
    timestamps?: DateLogType
}