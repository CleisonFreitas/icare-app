import type { EnderecoType } from "@/app/features/clientes/types/endereco.type";
import { ViaCepApi } from "../apis/via-cep.api";

export const useViaCepHook = () => {
    const getByCep = async (cep: string): Promise<Partial<EnderecoType>> => {
        return ViaCepApi({ cep });
    };

    return {
        getByCep,
    };
};