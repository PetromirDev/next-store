import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

type ResponseType = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  created: string;
  category: string;
}

type RequestType = {
  categories: string[],
  min: number;
  max: number;
  limit: number;
  q: string;
}

const ProductsRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
)  => {
  const db = await open({filename: "./database.sqlite", driver: sqlite3.Database});   
  const input:RequestType = req.query as {} as RequestType;
  let {categories, min, max, q, limit} = input;
  min = Math.floor(min)
  max = Math.floor(max)
  limit = Math.floor(limit)

  if(!categories || categories.length === 0) categories = ["phone", "laptop", "tablet"];
  else {
    categories = (categories as unknown as string).split(',');
  }
  if(!min || min < 0) min = 0;
  if(!max || max <= 0 || max < min) max = 1000000;
  if(!q || q == 'undefined') q = "";
  if(!limit || limit <= 0) limit = 20;

  const result:ResponseType = await db.all(`SELECT * FROM Product WHERE category IN (${categories.map((c) => `'${c}'`).join(',')}) AND price >= ? AND price <= ? AND name LIKE ? LIMIT ?`, [min, max, `${q}%`, limit]);

  return res.status(200).json(result)
}

export default ProductsRoute;