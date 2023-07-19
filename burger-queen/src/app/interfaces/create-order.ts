import { MenuItem } from "./menuInterface";

export interface CreateOrder {
    userId: string;
    client: string;
    quantity?: number;
    name: string;
    price: number;
    status: string;
    dateEntry: any;
    currentTime: any;
}
