export type CartItemType = {    
    id: number;
    pid: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export type CartType = {
    items: Array<CartItemType>;
    total: number;
}