import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

const CartRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<{}>
)  => {
    const db = await open({filename: "./database.sqlite", driver: sqlite3.Database});   
  
    if(req.method == "GET") {
        const { uid } = req.query;
        try {
            // const cartItems = await db.all("SELECT * FROM CartItem INNER JOIN Product ON CartItem.pid = Product.id WHERE uid = ?", uid);
            const cartItems = await db.all("SELECT * FROM Product INNER JOIN CartItem ON Product.id = CartItem.pid WHERE uid = ?", uid);
            return res.status(200).json(cartItems)
        } catch (err) {
            return res.status(500).json({message: "db-error", error: err})
        }
    } else if (req.method == "POST") {
        const { uid, pid, quantity } = req.body;
        try {
            const itemExists = await db.get("SELECT * FROM CartItem WHERE uid = ? AND pid = ?", uid, pid);
            if(itemExists) {
                await db.run(`UPDATE CartItem SET quantity = quantity + ? WHERE uid = ? AND pid = ?`, quantity, uid, pid);
                const last = await db.get("SELECT MAX(id) FROM CartItem")
                return res.status(200).json({id: last["MAX(id)"]});
            }
            await db.run("INSERT INTO CartItem (uid, pid, quantity) VALUES (?, ?, ?)", uid, pid, quantity);
            const last = await db.get("SELECT MAX(id) FROM CartItem")
            return res.status(200).json({id: last["MAX(id)"]});
        } catch (err) {
            return res.status(500).json({message: "db-error", error: err})
        }

    } else if (req.method == "PUT") {
        const { id, uid, type} = req.body;
        try {
            const cartItem = await db.run(`UPDATE CartItem SET quantity = quantity ${type == "increment" ? "+ 1" : "- 1"} WHERE id = ?`, id);
            return res.status(200).json({message: "updated", changes: cartItem.changes}); 
        } catch (err) {
            return res.status(500).json({message: "db-error", error: err})
        }

    } else if (req.method == "DELETE") {
        const { id, uid } = req.body;

        try {
            const {changes} = await db.run("DELETE FROM CartItem WHERE id = ?", id);
            if (changes) {
                return res.status(200).json({message: "deleted"});
            } else {
                return res.status(400).json({message: "item-not-found"});
            }
        } catch (err) {
            return res.status(500).json({message: "db-error", error: err})
        }
    }
}

export default CartRoute;