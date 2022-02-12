export class RegisterRequest {
    public username?: string;
    public email? :string;
    public password?: string;
    public passwordConfirm?: string;
}

export class ProductToCartRequest {
    public productId?: string;
    public username?: string;
}