export class AuthRequest {
    public username? : string;
    public password? : string;
}

export class AuthResponse {
    public jwt: string = '';
}