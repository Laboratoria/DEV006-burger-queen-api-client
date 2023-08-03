export interface MenuItem {
    id: number;
    dateEntry: string;
    name: string;
    image: string;
    price: number;
    type: string;
    quantity?: number;
    currentTime?: number;
}

export interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    type: string;
}

export interface CreateProduct {
    id: number;
    name: string;
    image: string;
    price: string;
    type: string;
}
