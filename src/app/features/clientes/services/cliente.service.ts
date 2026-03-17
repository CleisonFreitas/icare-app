import { ApiConfig } from "../../../core/api/api.config"
import type { ClienteType } from "../types/cliente.type"
import type { ContatoType } from "../types/contato.type";
import type { EnderecoType } from "../types/endereco.type";

const base = '/cliente';

export const ClienteService = {
    getAll: async (params: Record<string, any>) => {
        const { data } = await ApiConfig.get("/cliente", {
            params
        });

        return data;
    },

    getById: async (id: number): Promise<ClienteType> => {
        return await ApiConfig
            .get(`${base}/${id}`)
            .then((cliente) => cliente.data);
    },

    create: async (cliente: ClienteType): Promise<ClienteType> => {
        return await ApiConfig
            .post(`${base}`, cliente)
            .then(cliente => cliente.data);
    },

    update: async (cliente: Partial<ClienteType>): Promise<ClienteType> => {
        return await ApiConfig
            .put(`${base}/${cliente.id}`, cliente)
            .then((cliente) => cliente.data);
    },

    delete: async (id: number): Promise<void> => {
        await ApiConfig.delete(`${base}/${id}`);
    },

    updateAddress: async (
        endereco: EnderecoType,
    ): Promise<EnderecoType> => {
        return await ApiConfig
            .put(`${base}/${endereco.clienteId}/endereco`, endereco)
            .then((endereco) => endereco.data);
    },

    updateContacts: async (
        contatos: ContatoType[],
    ): Promise<ContatoType[]> => {
        return await ApiConfig
            .put(`${base}/${contatos[0].clienteId}/contatos`, contatos)
            .then((contatos) => contatos.data);
    }
}