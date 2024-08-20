export interface ProductParamCreate {
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export interface ProductParamUpdate {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}