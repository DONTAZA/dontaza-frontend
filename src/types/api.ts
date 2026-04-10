export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success?: false;
  message: string;
  status: number;
  code?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
