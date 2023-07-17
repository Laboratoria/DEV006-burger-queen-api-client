export interface MenuItem {
    name: string;
    image: string;
    price: number;
    quantity?: number;
}

export interface MenuObjects {
    id: number,
    name: string,
    price: number,
    image: string,
    type: string,
    quantity?: number;
}