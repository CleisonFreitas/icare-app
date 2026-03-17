import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ClienteService } from "../services/cliente.service"
import type { ClienteType } from "../types/cliente.type"

export const useCliente = () => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: ClienteService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"] })
        }
    });

    const update = useMutation({
        mutationFn: ClienteService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"] })
        }
    });

    const remove = useMutation({
        mutationFn: ClienteService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"] })
        }
    });

    const getById = (id?: string | number) => {
        return useQuery({
            queryKey: ["cliente", id],
            queryFn: () => ClienteService.getById(Number(id)),
            enabled: !!id,

            initialData: () => {
                const clientes = queryClient.getQueryData<ClienteType[]>(["clientes"]);
                return clientes?.find(c => c.id === Number(id));
            }
        });
    };

    const updateClientAddress = useMutation({
        mutationFn: ClienteService.updateAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"]})
        }
    });

    const updateClientContacts = useMutation({
        mutationFn: ClienteService.updateContacts,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientes"]})
        }
    });

    return {
        create,
        update,
        remove,
        getById,
        updateClientAddress,
        updateClientContacts
    }
}