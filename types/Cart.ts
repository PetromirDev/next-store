export interface CartItemType {    
    id: number;
    pid: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface CartType {
    items: Array<CartItemType>;
    total: number;
}