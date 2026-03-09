import { AxiosError } from "axios";
import { ExceptionEnum } from "../../shared/enums/exception.enum";

export type ApiError =
  | {
      type: ExceptionEnum.Validation;
      message: string;
      errors: { key: string; value: string }[];
    }
  | {
      type: ExceptionEnum.Generic;
      message: string;
    };

export const handleApiError = (error: unknown): never => {
  const err = error as AxiosError<any>;

  // 🔹 Laravel validation
  if (err.response?.status === 422) {
    const validation = err.response.data;

    const formattedErrors = Object.entries(validation.errors).map(
      ([key, value]) => ({
        key,
        value: (value as string[])[0]
      })
    );

    throw {
      type: ExceptionEnum.Validation,
      message: validation.message,
      errors: formattedErrors
    } as ApiError;
  }

  // 🔹 Unauthorized
  if (err.response?.status === 401) {
    throw {
      type: ExceptionEnum.Generic,
      message: "Não autorizado."
    } as ApiError;
  }

  // 🔹 Fallback
  throw {
    type: ExceptionEnum.Generic,
    message: err.response?.data?.message || "Erro inesperado."
  } as ApiError;
};
