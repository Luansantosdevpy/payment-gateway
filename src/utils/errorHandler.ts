export class ErrorHandler extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}

export const handleError = (err: ErrorHandler, res: any) => {
  const { status, message } = err;
  res.status(status).json({
    status,
    message,
  });
};
