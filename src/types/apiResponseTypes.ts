export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    student?: {
      id: string;
      fullName: string;
      status: string;
    };
  };
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    student: {
      id: string;
      fullName: string;
    };
  };
}

export interface ApiError {
  error: string;
  details?: {
    [key: string]: string | null;
  };
}
