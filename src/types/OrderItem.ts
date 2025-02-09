import { Product } from "./Product";

 export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: string;
    createdAt: string;
    updatedAt: string;
    product:Product
}

