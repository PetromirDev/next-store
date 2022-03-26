import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import bcrypt from "bcrypt";
import Joi from "joi";

const userModel = Joi.object({
    email: Joi.string()
        .email({ 
            tlds: { 
                allow: false 
            } 
        }).required(),
    password: Joi.string()
        .required(),
    fName: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
    lName: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required()
})

const RegisterRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<{}>
)  => {
    // Database
    const db = await open({filename: "./database.sqlite", driver: sqlite3.Database});
    const input = req.body
    const email = input.email.toLowerCase()
    // Validating the data
    const {error} = userModel.validate(input);

    if(error) return res.status(400).json({message: "invalid-data"})
    
    // Checking if the user exists
    const emailExists = await db.get("SELECT * FROM user WHERE email = ?", email);
    if(emailExists) return res.status(400).send({message: "user-exists"});

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(input.password, salt);
    // Registering the user
    try{
        await db.run(
            "INSERT INTO user (fName, lName, email, password, created) VALUES (?, ?, ?, ?, ?)", 
            input.fName, input.lName, email, hashedPassword, Date.now()
        );
        return res.status(200).send({message: "success"})
    } catch (err){
        return res.status(400).send({message: "db-error", code: err})
    }
}

export default RegisterRoute;