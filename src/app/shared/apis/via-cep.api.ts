import type { EnderecoType } from "@/app/features/clientes/types/endereco.type";
import axios from "axios";

export const ViaCepApi = async ({ cep }: { cep: string }): Promise<Partial<EnderecoType>> => {
    const viaCepData = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(cep => cep.data);

    const endereco: Partial<EnderecoType> = {
        logradouro: viaCepData['logradouro'],
        bairro: viaCepData['bairro'],
        cidade: viaCepData['localidade'],
        uf: viaCepData['uf'],
    };
    return endereco;
}