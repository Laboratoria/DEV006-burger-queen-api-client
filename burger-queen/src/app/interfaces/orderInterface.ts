import { MenuItem } from "./menuInterface";

export interface Order {
    client: string;
    products: MenuItem[];
    status: string;
    dateEntry: string;
}
