import type { GenericException } from "./generic.exception";
import type { ValidationExceptionType } from "./validation.exception.type";

export type ExceptionType = {
    status: number;
    type: ValidationExceptionType | GenericException;
}