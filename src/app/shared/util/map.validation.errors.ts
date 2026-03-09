export const mapValidationErrors = <T extends Record<string, string>>(
  initial: T,
  errors: { key: string; value: string }[]
): T => {
  const formatted = { ...initial } as Record<keyof T, string>;

  errors.forEach(error => {
    if (error.key in formatted) {
      formatted[error.key as keyof T] = error.value;
    }
  });

  return formatted as T;
};
