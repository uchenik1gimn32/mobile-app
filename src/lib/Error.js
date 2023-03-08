export class ServerError extends Error {
  constructor(data) {
    super("500 ошибка на сервере");
    this.type = "SERVER_ERROR";
    this.status = 500;
    this.details = data;
  }
}

export class NotFoundError extends Error {
  constructor(data) {
    super("404 ошибка на сервере");
    this.type = "NOT_FOUND_ERROR";
    this.status = 404;
    this.details = data;
  }
}

export class ForbiddenError extends Error {
  constructor(data) {
    super("403 ошибка доступа");
    this.type = "FORBIDDEN_ERROR";
    this.status = 403;
    this.details = data;
  }
}

export class ResponseError extends Error {
  constructor(data) {
    super("OTHER SERVER ERROR");
    this.type = "OTHER_ERROR";
    this.details = data;
  }
}
