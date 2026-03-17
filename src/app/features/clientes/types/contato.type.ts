export type ContatoType = {
    id?: number;
    nome: string;
    tipo: "EMAIL" | "TELEFONE" | string;
    valor: string;
    preferencial: boolean;
    clienteId?: number;
}