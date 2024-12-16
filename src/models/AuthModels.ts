export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    name: string;
    token: string;
    refreshToken: string;
}
