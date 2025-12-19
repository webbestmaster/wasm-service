export class NeverError extends Error {
    // If it comes to calling a constructor with a parameter, typescript throws an error
    public constructor(value: never) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        super(`Unreachable statement: ${value}`);
        this.name = "NeverError";
    }
}
export function throwError(error: Error): void {
    console.warn("Throw a error!");
    console.error(error);
    throw error;
}

export function convertToError(mayBeError: unknown): Error {
    if (mayBeError instanceof Error) {
        return mayBeError;
    }

    if (mayBeError instanceof String || typeof mayBeError === "string") {
        return new Error(String(mayBeError));
    }

    return new Error("[convertToError]: unknown error");
}
