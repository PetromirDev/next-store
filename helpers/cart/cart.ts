// Types
import { Dispatch, SetStateAction } from "react"
import { CartType } from "../../types/Cart"
import { UserType } from "../../types/User"

export const AddToCart = (user: UserType | null, pid: number, quantity: number, setCart: Dispatch<SetStateAction<CartType>>, image: string, price: number, name: string, setIsCartOpen: (isCartOpen: boolean) => void) => new Promise<{id: number}>(async(resolve, reject) => {
    if(user !== null) {
        const uid = user.id;
        try {
            const response = await fetch(`/api/cart`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: uid,
                    pid: pid,
                    quantity: quantity
                })
            })
            resolve(response.json())
        } catch (err) {
            reject(err)
        }
    } else {
        alert("You must be logged in to add items to your cart!")
    }
}).then((newItem) => {
    setCart(old => {
        if(old.items.find(item => item.pid === pid)) {
            return {
                ...old,
                items: old.items.map(item => {
                    if(item.pid === pid) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                    }
                    return item
                })
            }
        }
        return {
            total: old.total, 
            items:[
                ...old.items, 
                {
                    id: newItem.id,
                    pid: pid, 
                    quantity: quantity, 
                    image: image, 
                    price: price, 
                    name: name
                }
            ]
        }
    })
    setIsCartOpen(true)
})// TODO

export const UpdateCartItemQuantity = (user: UserType | null, id: number, quantity: number, type: string, setCart: Dispatch<SetStateAction<CartType>>) => new Promise(async(resolve, reject) => {
    if(quantity == 1 && type == "decrement") return;
    else {
        if(user !== null) {
            const uid = user.id;
            try {
                const response = await fetch(`/api/cart`, {
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        uid: uid,
                        type: type
                    })
                })
                resolve(response.json())
            } catch (err) {
                reject(err)
            }
        } else {
            alert("You must be logged in to update your cart")
        }
    }

}).then(() => setCart(old => (
    {...old, items: old.items.map(item => item.id === id ? {...item, quantity: type == "increment" ? item.quantity + 1 : item.quantity - 1} : item)}
)))

export const RemoveItemFromCart = (user: UserType | null, id: number, setCart: Dispatch<SetStateAction<CartType>>) => new Promise(async(resolve, reject) => {
    if(user !== null) {
        const uid = user.id;
        try {
            const response = await fetch(`/api/cart`, {
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    uid: uid
                })
            })
            resolve(response.json())
        } catch (err){
            reject(err)
        }
    } else {
        alert("You must be logged in to remove items from your cart")
    }
}).then(() => setCart(old => (
    {...old, items: old.items.filter(item => item.id !== id)}
)))