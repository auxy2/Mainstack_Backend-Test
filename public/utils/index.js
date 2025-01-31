export const extractStatusCode = (error) => {
    return typeof error === "object" && error !== null && "statusCode" in error
        ? error.statusCode
        : 500;
};
