import express from "express";

import { getUserByEmail, createUser } from "../db/users";
import { random, authentication } from "../helpers";



export const register = async (req: express.Request, res: express.Response) => {
    try{
        console.log("Body reçu:", req.body); // 🔍 Debug
        
        const {username, email, password} = req.body;
        
        if(!username || !email || !password){
            console.log("Champs manquants:", {username, email, password}); // 🔍 Debug
            return res.status(400).json({ 
                error: "Missing required fields",
                received: {username, email, password}
            });
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).json({ error: "User already exists" });
        }
        
        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        
        return res.status(200).json(user).end();
    } catch (error){
        console.log("Erreur complète:", error); // 🔍 Debug
        return res.status(400).json({ error: error.message });
    }
}