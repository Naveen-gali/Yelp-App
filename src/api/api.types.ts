export interface ErrorResponse {
  stat: 'fail';
  message: string;
  error?: {
    code: string;
    description: string;
    field: string;
    instance: null;
  };
}

export interface SuccessResponse<T> {
  stat: 'ok';
  data: T;
}
