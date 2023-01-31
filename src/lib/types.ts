export interface DrawConfig {
    CompanyId: string;
    MaxDrawCountPerProduct: number;
    OptionalProductFilter: string[];
}

export interface DrawResult {
    PrimaryNumbers: number[];
    SecondaryNumbers: number[];
}  

export interface DrawData {
    DrawResults: DrawResult[];
}