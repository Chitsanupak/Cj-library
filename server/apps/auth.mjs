import jwt from "jsonwebtoken";
import {db} from "../utils/db.mjs";
import { Router } from "express";


const authRouter = Router();

authRouter.post("/register", async (req,res) =>{
    const user = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    const cllection = db.cllection("users");
    await cllection.insertOne(user);

    return res.json({
        message: "created successfully"
    });
});