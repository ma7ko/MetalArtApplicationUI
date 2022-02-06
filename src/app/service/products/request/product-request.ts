

export class Dimension {
    public id?: number;
    public width?: number;
    public height?: number;
    public depth?: number;
}

export class ProductResponse {
    public id?: number;
    public name?: string;
    public description?: string;
    public image?: any;
    public price?: number;
    public amount?: number;
    public available?: boolean;
    public shape?: number;
    public dimension?: Dimension;
    public customMultipartFile: any;
}