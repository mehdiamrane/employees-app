export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public fields?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Network error occurred") {
    super(message);
    this.name = "NetworkError";
  }
}
