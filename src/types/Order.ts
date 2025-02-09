
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    address: string;
    flag: boolean;
    createdAt: string;
    updatedAt: string;
}

 export interface Order {
    id: number;
    userId: number;
    totalPrice: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: User
}