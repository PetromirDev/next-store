import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LoginRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<{}>
)  => {
    const db = await open({filename: "./database.sqlite", driver: sqlite3.Database});   
    if(req.method == "POST"){
      const {password} = req.body
      const email = req.body.email.toLowerCase()
  
      // Checking if the user exists
      const user = await db.get("SELECT * FROM user WHERE email = ?", email);
      if(!user) return res.status(400).json({message: 'invalid-email'});
  

      // Validating the password
      const validPassword = await bcrypt.compare(password, user.password);
      if(!validPassword) return res.status(400).json({message: "invalid-password"})

      // Sending the JWT
      let validity = "1d";

      const token = jwt.sign({id: user.id, fName: user.fName, lName: user.lName, email: user.email}, process.env.JWT_SECRET as string, { expiresIn: validity});
      res.setHeader("Access-Control-Expose-Headers","auth-token")
      return res.status(200).setHeader('auth-token', token).json({message: "success"})
    } else return res.status(500).json({message: "invalid-method"})
}

export default LoginRoute;