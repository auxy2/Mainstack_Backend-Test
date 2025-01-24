

export const extractStatusCode = (error: unknown): number => {
    return typeof error === "object" && error !== null && "statusCode" in error
      ? (error as { statusCode: number }).statusCode
      : 500;
  };
  