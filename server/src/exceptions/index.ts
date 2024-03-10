// CustomError extends Error class so we can trow it as an exception.

export class CustomError extends Error {
  message!: string;
  status!: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
  }
}

// 401: Unauthorized request
export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

// 404: Not found
export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

// 400 : Bad request
export class ClientError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

// 403: Forbidden
export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}
