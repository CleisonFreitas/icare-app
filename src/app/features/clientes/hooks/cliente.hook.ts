import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ClienteService } from "../services/cliente.service";
import type { ClienteType } from "../types/cliente.type";

export const useCliente = () => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: ClienteService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"]})
        }
    });

    const update = useMutation({
        mutationFn: ClienteService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"]})
        }
    });

    const remove = useMutation({
        mutationFn: ClienteService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"]})
        }
    });

    const show = async (id: number) => {
        const cached = queryClient
            .getQueryData<ClienteType[]>(["clientes"])
            ?.find(c => c.id === id);

        if (cached) return cached;

        return ClienteService.getById(id);
    }

    return {
        create,
        update,
        remove,
        show
    }
}