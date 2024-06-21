import status from 'http-status';

interface AppErrorArgs {
  name?: string;
  httpCode?: number;
  description: string;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;

  constructor(args: AppErrorArgs) {
    super(args.description);

    this.name = args.name || 'Error';
    this.httpCode = args.httpCode || status.INTERNAL_SERVER_ERROR;
  }
}
