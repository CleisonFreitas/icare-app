import type { User } from "@/app/shared/contexts/auth.context";

export type AuthResponseType = {
    usuario: User;
    token: string;
}