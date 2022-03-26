import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

const ProductRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<{}>
)  => {
  const db = await open({filename: "./database.sqlite", driver: sqlite3.Database});   
  const { id } = req.query

  const product = await db.get("SELECT * FROM Product WHERE id = ?", id);
  return res.json(product)
}

export default ProductRoute;