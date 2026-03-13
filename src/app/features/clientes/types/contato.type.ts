export type ContatoType = {
    nome: string;
    tipo: "EMAIL" | "TELEFONE" | string;
    valor: string;
    preferencial: boolean;
}