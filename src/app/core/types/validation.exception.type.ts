type ErrorException = {
    key: string;
    value: string;
}

export type ValidationExceptionType = {
    message: string;
    errors: ErrorException[],
}